-- CreateEnum
CREATE TYPE "CoinSymbol" AS ENUM ('BTC', 'ETH', 'SOL', 'MON');

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "coin_name" TEXT NOT NULL,
    "coin_symbol" "CoinSymbol" NOT NULL,
    "price_below" DOUBLE PRECISION NOT NULL,
    "price_above" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
