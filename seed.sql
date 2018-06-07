DROP DATABASE IF EXISTS restaurants_db;
CREATE DATABASE restaurants_db;
\c restaurants_db;

CREATE TABLE areas
(
  area_id     SERIAL PRIMARY KEY,
  area_name    VARCHAR
);

CREATE TABLE restaurants 
(
  restaurant_id SERIAL PRIMARY KEY,
  restaurant_name VARCHAR,
  area_id     SMALLINT,
  cuisine     VARCHAR,
  website     VARCHAR,
  FOREIGN KEY (area_id) REFERENCES areas(area_id)

);

CREATE TABLE comments
(
  comment_id  SERIAL PRIMARY KEY,
  restaurant_id SMALLINT,
  body        VARCHAR,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings 
(
  rating_id     SERIAL PRIMARY KEY,
  restaurant_id SMALLINT,
  rating        SMALLINT NOT NULL CHECK (rating <= 5), 
  created_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

INSERT INTO areas
(area_name)
VALUES
('Manchester'),
('Altrincham'),
('Chorlton'),
('Northern Quater'),
('Didsbury');

INSERT INTO restaurants
(restaurant_name, area_id, cuisine, website)
VALUES
('Pizzaexpress', 2, 'Italian', 'www.pizza.com'),
('TGI Friday', 1, 'American', 'www.tgi.com'),
('KFC', 1, 'Fastfood', 'www.kfc.net'),
('Subway', 3, 'American', 'www.subway.co.uk'),
('Sangam', 4, 'Indian', 'www.sangam.com'),
('TamPoPo', 5, 'Thai', 'www.hotNspicy.com'),
('Golden Palace', 4, 'Chinese', 'www.goldenpalace.com' ),
('Hot Wok', 2, 'Chinese', 'www.hotwocky.com');

INSERT INTO comments
(restaurant_id, body)
VALUES
(1, 'Great free pizza!'),
(5, 'Spicy food but bad dessert'),
(3, 'Finger lickin good'),
(4, 'Whoa, definatley felt that in the morning'),
(2, 'best american food in town'),
(1, 'Found a pube in my pizza'),
(2, 'USA, USA.... Bumped into Trump...foul man #teamkim'),
(4, 'Great butty..... 6 inches is big enough');

INSERT INTO ratings
(restaurant_id, rating)
VALUES
(1, 5),
(5, 3),
(3, 4),
(4, 2),
(2, 5),
(1, 1),
(2, 2),
(4, 4),
(2, 5),
(2, 4);

SELECT * FROM restaurants;