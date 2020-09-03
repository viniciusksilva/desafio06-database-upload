import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await getRepository(Transaction).find();
    const balance = transactions.reduce(
      (acumulator: Balance, transaction: Transaction): Balance => {
        acumulator[transaction.type] += transaction.value;
        acumulator.total +=
          transaction.type === 'income'
            ? transaction.value
            : -transaction.value;
        return acumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    return balance;
  }
}

export default TransactionsRepository;
