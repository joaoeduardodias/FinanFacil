import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Account } from "../../account/entities/Account";
import { Card } from "../../card/entities/Card";
import { User } from "../../users/entities/User";

enum Operation {
  credit,
  debit,
}

@Entity("transactions")
class Transaction {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  user_id: string;

  @Column()
  type: Operation;

  @Column()
  value: number;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column()
  account_id: string;

  @ManyToOne(() => Card)
  @JoinColumn({ name: "card_id" })
  card: Card;

  @Column()
  card_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Transaction };
