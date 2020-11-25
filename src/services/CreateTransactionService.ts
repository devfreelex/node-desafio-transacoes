import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  type: 'income' | 'outcome';
  value: number;
  title: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: Request): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (!['income', 'outcome'].includes(type)) {
      throw new Error('Transaction type is invalid.');
    }

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance.');
    }

    return this.transactionsRepository.create({
      type,
      title,
      value,
    });
  }
}

export default CreateTransactionService;
