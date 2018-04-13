import { Calculation } from "server/entities";
import { getRepository } from "typeorm";

/**
 * A function to add two numbers
 * @param num1 The first one
 * @param num2 The second one
 */
export async function add(num1: number, num2: number) {
  const result = num1 + num2;

  await getRepository(Calculation).save({
    num1,
    num2,
    result
  });

  return result;
}
