-- commands.sql

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author VARCHAR(255),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0
);

INSERT INTO blogs (author, title, url, likes)
VALUES ('Matti Meikäläinen', 'Ensimmäinen blogi', 'http://example.com/1', 5);

INSERT INTO blogs (author, title, url, likes)
VALUES ('Liisa Esimerkki', 'Toinen blogi', 'http://example.com/2', 3);

INSERT INTO blogs (author, title, url, likes)
VALUES 
  ('Dan Abramov', 'Writing Resilient Components', 'http://example.com/dan-abramov', 0),
  ('Martin Fowler', 'Is High Quality Software Worth the Cost?', 'http://example.com/martin-fowler', 0),
  ('Robert C. Martin', 'FP vs. OO List Processing', 'http://example.com/robert-c-martin', 0);

