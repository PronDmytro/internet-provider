sleep 30s

#run the setup script to create the DB and the schema in the DB
/opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P yACPuaPq8kvQWLnHJpuF -d master -i setup.sql

