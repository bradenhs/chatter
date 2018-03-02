import { Calculation } from "server/entities";
import { getRepository } from "typeorm";

export async function add(num1: number, num2: number) {
  const result = num1 + num2;

  await getRepository(Calculation).save({
    num1,
    num2,
    result
  });

  return result;
}
