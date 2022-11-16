-- CreateTable
CREATE TABLE "game" (
    "id" SERIAL NOT NULL,
    "homeTeam" TEXT NOT NULL,
    "awayTeam" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameUsers" (
    "id" SERIAL NOT NULL,
    "gameId" INTEGER NOT NULL,
    "userMail" TEXT NOT NULL,
    "userPhoto" TEXT NOT NULL,
    "userName" TEXT NOT NULL,

    CONSTRAINT "GameUsers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameUsers" ADD CONSTRAINT "GameUsers_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO game ("homeTeam", "awayTeam", location, time) VALUES ('Brasil', 'Sérvia', 'Salão de festas do Abdalla', '24/11/2022 - 16h00');
INSERT INTO game ("homeTeam", "awayTeam", location, time) VALUES ('Brasil', 'Suíça', 'Churrasco no Abdalla', '28/11/2022 - 13h00'); 
INSERT INTO game ("homeTeam", "awayTeam", location, time) VALUES ('Camarões', 'Brasil', 'Salão de festas do Abdalla', '02/12/2022 - 16h00'); 
INSERT INTO game ("homeTeam", "awayTeam", location, time) VALUES ('Camarões', 'Brasil', 'Festa universitária - Farofada na copa', '02/12/2022 - 16h00'); 
