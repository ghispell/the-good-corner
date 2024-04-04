import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { Length } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  @Length(10, 100)
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  owner: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  ville: string;

  @Field()
  @Column({
    default:
      "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg",
  })
  imgUrl: string;

  @Field({ nullable: true })
  @ManyToOne(() => Category, (category) => category.ads)
  @JoinColumn()
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
}

@InputType()
export class NewAdInput implements Partial<Ad> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  owner: string;

  @Field()
  price: number;

  @Field()
  ville: string;

  @Field()
  imgUrl: string;

  @Field(() => ID, { nullable: true })
  category: Category;
}

@InputType()
export class AdUpdateInput implements Partial<Ad> {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  owner: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  ville: string;

  @Field({ nullable: true })
  imgUrl: string;

  @Field(() => ID, { nullable: true })
  category: Category;
}
