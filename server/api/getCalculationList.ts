import { Calculation } from "server/entities";
import { getRepository } from "typeorm";

interface Params {
  start: number;
  count: number;
}

export async function getCalculationList({ start, count }: Params) {
  return await getRepository(Calculation).find({
    skip: start,
    take: count
  });
}
