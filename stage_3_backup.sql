TRUNCATE TABLE `books`;
TRUNCATE TABLE `authors`;
ALTER TABLE `books` ADD `author_id` INT UNSIGNED NOT NULL AFTER `title`, ADD INDEX (`author_id`);
ALTER TABLE `books` ADD CONSTRAINT `book_author` FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO `authors` (`id`, `name`, `surname`) VALUES
(1, 'Suzanne', 'Collins'),
(2, 'J.K.', 'Rowling'),
(3, 'Harper', 'Lee'),
(4, 'Jane', 'Austen'),
(5, 'Stephenie', 'Meyer');

INSERT INTO `books` (`id`, `author_id`, `title`, `description`) VALUES
(1, 1,'The Hunger Games', 'The nation of Panem, formed from a post-apocalyptic North America, is a country that consists of a wealthy Capitol region surrounded by 12 poorer districts. Early in its history, a rebellion led by a 13th district against the Capitol resulted in its destruction and the creation of an annual televised event known as the Hunger Games. In punishment, and as a reminder of the power and grace of the Capitol, each district must yield one boy and one girl between the ages of 12 and 18 through a lottery system to participate in the games. The \'tributes\' are chosen during the annual Reaping and are forced to fight to the death, leaving only one survivor to claim victory.\r\n\r\nWhen 16-year-old Katniss\'s young sister, Prim, is selected as District 12\'s female representative, Katniss volunteers to take her place. She and her male counterpart Peeta, are pitted against bigger, stronger representatives, some of whom have trained for this their whole lives. , she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature. '),
(2, 2,'Harry Potter and the Order of the Phoenix', 'Harry Potter is due to start his fifth year at Hogwarts School of Witchcraft and Wizardry. His best friends Ron and Hermione have been very secretive all summer and he is desperate to get back to school and find out what has been going on. However, what Harry discovers is far more devastating than he could ever have expected...\r\n\r\nSuspense, secrets and thrilling action from the pen of J.K. Rowling ensure an electrifying adventure that is impossible to put down'),
(3,3, 'To Kill a Mockingbird', 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.\r\n\r\nCompassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.'),
(4,4, 'Pride and Prejudice', '\"It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife.\" So begins Pride and Prejudice, Jane Austen’s witty comedy of manners—one of the most popular novels of all time—that features splendidly civilized sparring between the proud Mr. Darcy and the prejudiced Elizabeth Bennet as they play out their spirited courtship in a series of eighteenth-century drawing-room intrigues. Renowned literary critic and historian George Saintsbury in 1894 declared it the \"most perfect, the most characteristic, the most eminently quintessential of its author’s works,\" and Eudora Welty in the twentieth century described it as \"irresistible and as nearly flawless as any fiction could be.\"\r\n--penguinrandomhouse.com'),
(5,5, 'Twilight', 'About three things I was absolutely positive.\r\n\r\nFirst, Edward was a vampire.\r\n\r\nSecond, there was a part of him—and I didn\'t know how dominant that part might be—that thirsted for my blood.\r\n\r\nAnd third, I was unconditionally and irrevocably in love with him.\r\n\r\nIn the first book of the Twilight Saga, internationally bestselling author Stephenie Meyer introduces Bella Swan and Edward Cullen, a pair of star-crossed lovers whose forbidden relationship ripens against the backdrop of small-town suspicion and a mysterious coven of vampires. This is a love story with bite.');