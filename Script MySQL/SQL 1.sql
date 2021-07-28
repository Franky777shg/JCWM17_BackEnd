-- create database
create schema kantor;
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
select * from employees where officeCode = 1;
select * from products where productline = 'Classic Cars';
select productCode, productName, productLine, productVendor from products where productLine = 'Motorcycles';

-- WHERE AND
select * from products where productLine = 'Motorcycles' and productVendor = 'Welly Diecast Productions';

-- WHERE OR
select * from customers where country = 'France' or country = 'USA';

-- WHERE NOT
select * from customers where country != 'USA';

-- SORTING
select * from customers order by contactLastName;
select * from customers order by contactLastName desc;

-- Logical Operator
select * from products where buyPrice <= 80.00;
select * from customers where creditLimit >= 100000.00;

-- WHERE IN
select * from products where productLine in ('Motorcycles', 'Classic Cars');

-- WHERE LIKE
select * from customers where customerName like 'b%';
select * from customers where customerName like '%s';
select * from customers where customerName like '%mini%';

-- WHERE IS NULL
select * from offices where state is null;

-- AGGREGATE FUNCTION
-- AVG
select avg(creditLimit) as ini_rata2_credit_limit from customers;

-- COUNT
select count(*) as Total_Product from products;
select count(*) as Total_Customers from customers;

-- SUM
select sum(quantityInStock) as Total_Jumlah_Barang from products;

-- MIN & MAX
select min(amount) as Min_Payment from payments;
select max(amount) as Max_Payment from payments;

-- GROUP BY
select * from products group by productLine;
select * from customers group by country;

-- GROUP BY and AVG
select productLine, avg(buyPrice) as Average from products group by productLine order by Average;

-- GROUP BY and COUNT
select productLine, count(*) as Total_Per_Product_Line from products group by productLine order by Total_Per_Product_Line;

-- GROUP BY and SUM
select productLine, sum(quantityInStock) as Total_Qty from products group by productLine order by Total_Qty;

-- tampilkan data total nilai per group yang ada di kolom productLine
select productLine, sum(quantityInStock) as Total_Qty, sum(buyPrice) as Total_Price, sum(quantityInStock * buyPrice) as Total_Nilai from products group by productLine;

-- GROUP BY and MIN
select productLine, min(buyPrice) as Lowest_Price from products group by productLine order by Lowest_Price;

-- GROUP BY and MAX
select country, max(creditLimit) as Highest_Credit_Limit from customers group by country order by Highest_Credit_Limit desc;
select * from customers where creditLimit = 227600.00;

-- LIMITING
select * from products;
select * from products limit 10;
select * from products limit 5, 10;
select * from products where productline = 'Classic Cars' limit 5, 10;

-- UPDATE DATA
select * from karyawan;
UPDATE karyawan SET nama = 'Saber' WHERE idkaryawan = 3;
UPDATE karyawan SET posisi = 'Direktur' WHERE idkaryawan = 4;
UPDATE karyawan SET gaji = 7000000 WHERE posisi = 'Tukang Parkir'; -- ini tidak boleh! where harus primary key

-- DELETE DATA
DELETE FROM karyawan WHERE idkaryawan = 5;

-- RELATIONAL DATABASE
-- INNER JOIN
SELECT t1.productCode, t1.productName, t1.productLine, t1.productVendor, t1.productDescription, 
t1.quantityInStock, t1.buyPrice, t2.textDescription
FROM
    products t1
INNER JOIN productlines t2
    ON t1.productline = t2.productline;
    
select em.employeeNumber, em.lastName, em.firstName, em.email, em.officeCode,
em.jobTitle, o.city, o.country, o.postalCode
from employees em
inner join offices o
on em.officeCode = o.officeCode;
















