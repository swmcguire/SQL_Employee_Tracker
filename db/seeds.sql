use cms_db;

INSERT INTO department(name)
Values('IT'),
('Accounting'),
('Marketing');

insert into role (title, salary, department_id)
values ('Director', 125000, 1),
('Director', 125000, 2),
('Director', 125000, 3),
('Networking',100000,1),
('Help Desk',50000,1),
('Tax',75000,2),
('Analyst',90000,2),
('Lead Generation', 100000,3),
('Product owner',75000,3);

insert into employee (first_name, last_name, role_id,manager_id)
values ('Sean', 'McGuire',1,Null), 
('Jess', 'Hockley',2,Null),
('Winston','Bishop',3, Null),
('Willow', 'Grace',4,1),
('Tyler','Durden',5,1),
('Ed','Norton',6,2),
('Sheryl','Daniels',7,2),
('Terry','Omaha',8,3),
('Amanda','Hyde',9,3)