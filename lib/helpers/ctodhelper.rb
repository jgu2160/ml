class CtoDHelper
  class << self
    def make_table(file)
      file_path = file[:tempfile].path
      table_name = file[:filename][0..-5]
      csv = File.foreach(file_path).first(2)
      col_names = csv[0].split(",").map {|name| name.delete(" ").delete("\n").gsub(/\W/,"")}
      types = get_types(csv[1])
      table_cols = get_tbl_cols(col_names, types)

      db_command = "CREATE TABLE #{table_name} (#{table_cols});"
      rc = ActiveRecord::Base.connection.raw_connection

      begin
        rc.exec(db_command)
      rescue
        `rm #{file_path}`
        return 404, "You've already uploaded this CSV."
      end

      rc.exec("COPY " + table_name + "(" + col_names.join(",") + ") FROM STDIN WITH CSV")

      Benchmark.bm do |x|
        x.report do

          file = File.readlines(file_path).drop(1)

          #Parallel.each(file, in_processes: 1) do |line|
          file.each do |line|
            rc.put_copy_data(line)
          end
        end
      end

      # We are done adding copy data
      rc.put_copy_end

      # Display any error messages
      while res = rc.get_result
        if e_message = res.error_message
          p e_message
        end
      end

      `rm #{file_path}`
      return 200, {response: "okay"}
    end

    def get_types(row)
      CSV.parse(row, converters: :all)[0].map do |datum|
        datum.class
        if datum.class == Fixnum
          "double precision"
        else
          "varchar"
        end
      end
    end

    def get_tbl_cols(names, types)
      names.map.with_index do |col, index|
        if index == names.length - 1
          "#{col} #{types[index]}"
        else
          "#{col} #{types[index]},"
        end
      end.join
    end
  end
end
