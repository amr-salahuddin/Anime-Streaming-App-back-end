create table Myuser
(
id SERIAL PRIMARY KEY,
username varchar(100) ,
Pass     varchar(100) ,
Usermail  varchar(100) ,
UserAtt   int  --0 for user 1 for admin--
);
-- create the table of the watchlist of user

-- create the record of our Ban list
Create table Ban
(
Myuser_id integer ,
Ban_reason varchar(100) ,
Primary key (Myuser_id),
Foreign key (Myuser_id) references Myuser
	on delete cascade 
	on update cascade
);
-- create the AuthorTable
Create table Author
(
id SERIAL PRIMARY KEY,
firstN varchar(100),
title varchar(100),
LastN varchar(100),
Birthdate  DATE  ,  -- when inserting into date u should know it's a date --> TO_DATE('mydate','DD/MM/YYYY')
Years_active integer ,
Atype   varchar(100) 


);
-- create the SingerTable
Create table Singer 
(
id SERIAL PRIMARY KEY,
FirstN varchar(100),
title varchar(100),
LastN varchar(100),
Birthdate Date 
);

--create table comments
create table Comment
(
ID SERIAL PRIMARY KEY,
Comm_data varchar(100) ,
Myuser_ID integer ,
Anime_Id integer ,
C_Date   date ,
Foreign key (Myuser_ID) references Myuser
on delete cascade
on update cascade
);
--1)ANIME
CREATE TABLE Anime(
    id SERIAL PRIMARY KEY,
    Anime_name varchar(30),
    author_id int , --ref
    studio_id int , --ref
    date_published DATE,
    rate int,
    episodes int,
    genre varchar(30),
	Foreign key (author_id) references author
	on delete cascade 
	on update cascade
);


--2)AWARDS
CREATE TABLE Anime_Awards(
    anime_id int , --ref
    Award_name varchar(30),
    PRIMARY KEY(anime_id,Award_name),
	Foreign key (anime_id) references Anime
	on delete cascade 
	on update cascade
);

--3)EPISODES
CREATE TABLE Episodes(
    anime_id int, -- ref
    episode_number int,
    episode_link TEXT,
    PRIMARY KEY(anime_id,episode_number),
    Foreign key (anime_id) references Anime
	on delete cascade 
	on update cascade
);

--4)ANIME STUDIO
CREATE TABLE Anime_Studio(
    id SERIAL,
    Studio_name varchar(30) , 
    founder varchar(30),
    date_created DATE,
    popular_anime_id int , --ref
    PRIMARY KEY(id),
	Foreign key (popular_anime_id) references Anime
	on delete cascade
	on update cascade
);
--6)Enquiries
CREATE TABLE Enquiries(
    id SERIAL, 
    Myuser_id int , -- ref
    Enquiry_message TEXT,
    Enq_type int, -- 0,1,2,3 
    PRIMARY KEY(id),
	Foreign key (Myuser_id) references Myuser
	on delete cascade 
	on update cascade
);
--7)Anime_Song
CREATE TABLE Anime_Song(
    id SERIAL, 
    Song_name varchar(3),
    anime_id int, --ref
    date_published Date, 
    singer_id int,
    PRIMARY KEY(id),
	Foreign key (anime_id) references Anime
	on delete cascade
	on update cascade,
	Foreign key (Singer_id) references Singer
	on delete cascade 
	on update cascade

);

--7x)Song_Type
CREATE TABLE Song_Type(
    song_id int,
    song_type int,
    PRIMARY KEY (song_id,song_type),
	Foreign key (song_id) references Anime_Song
	on update cascade
	on delete cascade
);


--8)Anime_VA
CREATE TABLE Anime_VA(
    id SERIAL,
    VA_name varchar(30),
    birthdate Date,
    PRIMARY KEY(id)
);
-- create the table of Anime characters
Create table Anime_character
(
id SERIAL PRIMARY KEY,
C_Name varchar(100) , -- cuz name is reserved word
C_Role integer , -- cuz  Role is reserved word   0 for main 1 for secondary
VA_ID integer , -- references Voice actor 
Rate float ,
Anime_ID integer ,

Foreign key (VA_ID) references Anime_VA
on delete cascade
on update cascade,
Foreign key (Anime_ID) references Anime 
on delete cascade
on update cascade

);

--5)News
CREATE TABLE News(
    id SERIAL, 
    link TEXT,
    anime_id int,--ref 
    studio_id int, --ref
    anime_char_id int,--ref
    va_id int, --ref
    author_id int, -- ref
	Singer_id int,
	publishdate date,
    PRIMARY KEY(id),
	Foreign key (anime_id) references Anime,
	
	Foreign key (Studio_id) references Anime_Studio,
	Foreign key (Singer_id) references Singer,
	Foreign key (va_id) references Anime_VA,
	Foreign key (author_id) references Author,
	Foreign key (Anime_char_id) references Anime_character
);
--create table the Awards of Voice actor
create table Awards_by_VA
(
VA_ID integer ,
Awards varchar(100),
Primary Key (VA_ID , Awards),
Foreign key (va_id) references Anime_VA
	on delete cascade 
	on update cascade
);
create table User_watchlist
(
Myuser_id integer ,
anime_id integer ,
primary key(Myuser_id,anime_id),
Foreign key (Myuser_id) references Myuser
on delete cascade
on update cascade,
Foreign Key (anime_id) references Anime
on delete cascade
on update cascade
);
--create the table of the Favorite animes of user that he already watched
create table User_Favorite
(
Myuser_id integer ,
anime_id integer ,
primary key (myuser_id,anime_id),
Foreign key (Myuser_id) references Myuser
on delete cascade 
on update cascade,
Foreign Key (anime_id) references Anime
on delete cascade
on update cascade
);
alter table Anime add foreign key (studio_id) references Anime_Studio;
