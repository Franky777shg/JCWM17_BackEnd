use kantor;

CREATE TABLE category (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  parent_id int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (parent_id) REFERENCES category (id) 
    ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO category(title,parent_id) 
VALUES('Electronics',NULL);

INSERT INTO category(title,parent_id) 
VALUES('Laptops & PC',1);

INSERT INTO category(title,parent_id) 
VALUES('Laptops',2);
INSERT INTO category(title,parent_id) 
VALUES('PC',2);

INSERT INTO category(title,parent_id) 
VALUES('Cameras & photo',1);
INSERT INTO category(title,parent_id) 
VALUES('Camera',5);

INSERT INTO category(title,parent_id) 
VALUES('Phones & Accessories',1);
INSERT INTO category(title,parent_id) 
VALUES('Smartphones',7);

INSERT INTO category(title,parent_id) 
VALUES('Android',8);
INSERT INTO category(title,parent_id) 
VALUES('iOS',8);
INSERT INTO category(title,parent_id) 
VALUES('Other Smartphones',8);

INSERT INTO category(title,parent_id) 
VALUES('Batteries',7);
INSERT INTO category(title,parent_id) 
VALUES('Headsets',7);
INSERT INTO category(title,parent_id) 
VALUES('Screen Protectors',7);

-- finding the root node
select * from category where parent_id is null;

-- finding node lvl 2
select * from category where parent_id = 1;

-- finding child from Phone & Acc
select * from category where parent_id = 7;

-- finding leaf nodes
select * 
from category t1
left join category t2
on t1.id = t2.parent_id
where t2.id is null;
