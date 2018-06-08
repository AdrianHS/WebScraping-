
CREATE TABLE tablaPosiciones
(
	ranking 	varchar(50),
	nameTeam 	varchar(50),
	image 		varchar(50),
	points 		varchar(50),
	previousPoints 	varchar(50),
	prom2018 	varchar(50),
	rstl2018 	varchar(50),
	prom2017 	varchar(50),
	rstl2017 	varchar(50),
	confederation 	varchar(50)
);

create or replace function Transaccion_InsertarPosiciones(ranking varchar(50), nameTeam varchar(50),image varchar(50),points varchar(50),
	previousPoints 	varchar(50), prom2018 varchar(50),rstl2018 varchar(50),	prom2017 varchar(50),rstl2017 varchar(50),confederation	varchar(50)) returns void
as
$$
begin
	INSERT INTO tablaPosiciones VALUES (ranking, nameTeam,image,points,previousPoints,prom2018,rstl2018,prom2017,rstl2017,confederation);
	IF NOT FOUND THEN
		RAISE EXCEPTION 'Error en la inserción: no se ha podido insertar en la tabla de posiciones';
	END IF; 
end;
$$
language plpgsql;

SELECT Transaccion_InsertarPosiciones ('345678926','Maria','Pers','maria@gmail.com','87968541','maria12','12fdg4','123jj4','12yt34','1e234');



drop table tablaPosiciones
select * from tablaPosiciones
