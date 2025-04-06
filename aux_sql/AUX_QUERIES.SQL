
SELECT * FROM "Restaurants"
SELECT * FROM "Burgers" b 
SELECT * FROM "Reviews" r 


SELECT b.*, AVG(r.rating) as averageRating FROM "Burgers" b
        LEFT JOIN "Reviews" r ON b.id = r."burgerId"
        GROUP BY b.id
        ORDER BY averageRating DESC

SELECT AVG(rating) as averageRating FROM "Reviews" WHERE "burgerId" = 1