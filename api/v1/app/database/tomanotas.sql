drop database if exists tomanotas;
create database tomanotas;
use tomanotas;

create table rols(
idrol int not null auto_increment,
name varchar(50) not null,
primary key(idrol)
);

create table users(
iduser int not null auto_increment,
idrol int not null,
name varchar(50) not null,
lastname varchar(50) not null,
email varchar(50) not null,
nickname varchar(50) not null,
password varchar(200) not null,
status boolean not null,
image date null,
born_date date null,
create_date datetime not null,
primary key(iduser),
foreign key (idrol) references rols(idrol)
);

create table typecategories(
  idtypecategory int not null auto_increment,
  name varchar(50) not null,
  primary key(idtypecategory)
);

create table categories(
  idcategory int not null auto_increment,
  idtypecategory int not null,
  descripcion varchar(200) not null,
  primary key(idcategory),
  foreign key (idtypecategory) references typecategories(idtypecategory)
);

create table links (
idlink int not null auto_increment,
iduser int not null,
idcategory int null,
title varchar(500) null,
url varchar(5000),
create_datetime datetime not null,
primary key(idlink),
foreign key (iduser) references users(iduser),
foreign key (idcategory) references categories(idcategory)
);

create table sharedlinks(
idsharedlink int not null auto_increment,
iduser_receive int not null,
iduser_deliver int not null,
idlink int not null,
create_date datetime not null,
primary key(idsharedlink),
foreign key (iduser_receive) references users(iduser),
foreign key (iduser_deliver) references users(iduser),
foreign key (idlink) references links(idlink)
);

create table notes(
idnote int not null auto_increment,
iduser int not null,
title varchar(1000) null,
description mediumtext not null,
status boolean not null,
create_date datetime not null,
primary key(idnote),
foreign key (iduser) references users(iduser)
);

create table files(
idfile int not null auto_increment,
iduser int not null,
path varchar(1000) not null,
size float not null,
type varchar(100) not null,
status boolean not null,
create_date datetime not null,
primary key(idfile),
foreign key (iduser) references users(iduser)
);

create table typenotifications(
idtypenotification int not null auto_increment,
name varchar(60) not null,
primary key(idtypenotification)
);

create table notifications(
idnotification int not null auto_increment,
iduser int not null,
idtypenotification int not null,
create_date datetime not null,
primary key(idnotification),
foreign key (idtypenotification) references typenotifications(idtypenotification),
foreign key (iduser) references users(iduser)
);

create table sharedfiles(
idsharedfile int not null auto_increment,
iduser_receive int not null,
iduser_deliver int not null,
idfile int not null,
create_date datetime not null,
primary key(idsharedfile),
foreign key (iduser_receive) references users(iduser),
foreign key (iduser_deliver) references users(iduser),
foreign key (idfile) references files(idfile)
);
-- question
-- use categories and typecategories o single for every one
-- use tasks and duties in a table?

create table taskcategories(
  idtaskcategory int not null auto_increment,
  name varchar(50) not null,
  primary key(idtaskcategory)
);
create table taskstatuses(
  idtaskstatus int not null auto_increment,
  name varchar(50) not null,
  primary key(idtaskstatus)
);

create table tasks(
idtask int not null auto_increment,
iduser int not null,
description varchar(1000) not null,
limit_date  datetime not null,
status boolean not null,
create_date datetime not null,
primary key(idtask),
foreign key (iduser) references users(iduser)

);
-- end 
create table schedules(
idschedule int not null auto_increment,
iduser int not null,
name varchar(100) null,
status boolean not null,
create_date datetime not null,
primary key(idschedule),
foreign key (iduser) references users(iduser)
);

create table duties(
idduties int not null auto_increment,
idschedule int not null,
descripcion text not null,
hour int not null,
minut int not null,
meridian varchar(2) not null,
status boolean not null,
create_date datetime not null,
primary key(idduties),
foreign key (idschedule) references schedules(idschedule)
);

-- TABLES OF REPORTS
-- sessions - views site etc
 create table loggins(
 idlogin int not nulL auto_increment,
 iduser int not null,
 place varchar(100) null,
 server varchar(100) null,
 login_date  datetime not null,
 primary key(idlogin),
 foreign key (iduser) references users(iduser)
 );

-- TABLES OF BACK UP
create table bp_links (
idlink int not null auto_increment,
iduser int not null,
idcategory int null,
title varchar(500) null,
url varchar(5000),
create_datetime datetime not null,
deleted_datetime datetime not null,
primary key(idlink),
foreign key (iduser) references users(iduser),
foreign key (idcategory) references categories(idcategory)
);

-- compartido con otros..compartido con conmigo
create procedure files_shared (iduser int)
select AC.id_archivo_compartido_PK,A.id_usuario_FK,AC.id_usuario_entrega_FK, AC.id_archivo_FK,A.ruta,A.tamano,AC.id_usuario_recibe_FK,U.nombre,U.apellido,AC.fecha
from files as f inner join sharedfiles as fs  on f.idfile = fs.idfile
                   inner join users as u on u.iduser_receive = f.iduser
                   where fs.iduser_deliver = iduser OR fs.iduser_receive = iduser  ORDER BY fs.idsharedfile DESC;
                   
-- compartido con otros..compartido con conmigo
create procedure links_shared (iduser int)
select sl.idsharedlink,sl.iduser_deliver,ls.iduser_receive,u.name,u.lastname,sl.idlink,l.url,l.title,sl.create_date
from links as l  inner join sharedlinks as sl  on l.idlink = sl.idlink
                   inner join users as u on sl.iduser = u.iduser 
                   WHERE sl.iduser_deliver = iduser OR sl.iduser_receive = iduser  ORDER BY sl.idsharedlink DESC ;                   

-- creacion de vistas
create view get_notifications as
  select n.idnotification, u.iduser,u.name, u.lastname, n.idtypenotification, n.create_date 
      from notifications as n inner join users as u on u.iduser = n.iduser
      ORDER BY n.idnotification DESC;

create view get_loggins as
  select l.idlogin,u.iduser, u.name, u.lastname, l.login_date 
      from loggins as l inner join users as u on u.iduser = l.iduser
      ORDER BY l.idlogin DESC;

-- uso de un trigger para las notas eliminadas
create trigger delete_link_BD before delete on links for each row 
insert into bp_links values(old.idlink,old.iduser,old.idcategory,old.title,old.url,old.create_datetime,now());

create view report_modulus as
select u.nickname,u.iduser,count(distinct l.idlink) as L,count( distinct n.idnote) as N,
                                 count( distinct a.idfile) as A,count( distinct t.idtask) as T,
                                 count( distinct c.idschedule) as C
          from users as u left join links as l on u.iduser = l.iduser
                            left join notes as n on u.iduser = n.iduser
                            left join tasks as t on u.iduser = t.iduser
                            left join files as a on u.iduser = a.iduser
                            left join schedules as c on u.iduser = c.iduser
                            GROUP BY u.nickname,u.iduser ORDER BY u.iduser asc;
