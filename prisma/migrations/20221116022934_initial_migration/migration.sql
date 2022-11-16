-- CreateTable
CREATE TABLE "game" (
    "id" TEXT NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameUsers" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userMail" TEXT NOT NULL,
    "userPhoto" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "GameUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameUsers" ADD CONSTRAINT "GameUsers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO game (id, "homeTeam", "awayTeam", location, time) VALUES ('8b792dd7-84e7-4398-9937-3f10d27ef8e3', 'Brasil', 'Sérvia', 'Salão de festas do Abdalla', '24/11/2022 - 16h00');
INSERT INTO game (id, "homeTeam", "awayTeam", location, time) VALUES ('ff4994cc-8fa0-4c90-832d-57c77181d904', 'Brasil', 'Suíça', 'Churrasco no Abdalla', '28/11/2022 - 13h00'); 
INSERT INTO game (id, "homeTeam", "awayTeam", location, time) VALUES ('236030bd-4d9e-4c66-a562-8bc0bcbc72a8', 'Camarões', 'Brasil', 'Salão de festas do Abdalla', '02/12/2022 - 16h00'); 
INSERT INTO game (id, "homeTeam", "awayTeam", location, time) VALUES ('f674fbbd-6ced-4ac1-8cb3-0c20c37f60f0', 'Camarões', 'Brasil', 'Festa universitária - Farofada na copa', '02/12/2022 - 16h00'); 