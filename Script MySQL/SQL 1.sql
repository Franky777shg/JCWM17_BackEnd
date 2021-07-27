-- create database
create schema kantor_kedua;
create database kantor_kedua;

-- delete database
drop schema kantor_kedua;
drop database kantor_kedua;

-- read data
use kantor;

-- baca semua data dari karyawan
select * from karyawan;

-- baca data tertentu dari karyawan
select idkaryawan, nama from karyawan;

-- insert one data
insert into karyawan (nama, gaji, posisi) values ('Jensen', 15000000, 'Satpam');
-- insert multiple data
insert into karyawan (nama, gaji, posisi) values ('Johan', 10000000, 'Office Boy'), ('Jenkins', 5000000, 'Tukang Parkir'), ('Jhonny', 20000000, 'Tukang Kebon');

-- select data
use classicmodels;
select * from employees;

-- WHERE
select * from employees where officeCode =1;
select * from products where productline = 'Classic Cars';
select productCode, productName, productLine, productVendor from products where productLine = 'Motorcycles';

-- WHERE AND
select * from products where productLine = 'Motorcycles' and productVendor = 'Welly Diecast Productions';

-- WHERE OR
select * from customers where country = 'France' or country = 'USA';

-- WHERE NOT
select * from customers where country != 'USA';

-- ORDER BY
select * from customers order by contactLastName;
select * from customers order by contactLastName desc;

-- Logical Operator
select * from products where buyPrice <= 80.00;
select * from customers where creditLimit >= 100000.00;

