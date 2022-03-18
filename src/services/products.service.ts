import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dto/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {

  private counterID: number = 1;

  private products: Product[] = [{
    id: 1,
    name: 'Product 1',
    description: 'Example of description',
    price: 23,
    stock: 54,
    image: 'url ** pending'
  }];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find(product => product.id === id);
    if(!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto): Product {
    this.counterID++;
    const newProduct: Product = {
      id: this.counterID,
      ...payload
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto): Product | null  {
    const product = this.findOne(id);
    if(product) {
      const index = this.products.findIndex(product => product.id === id);
      this.products[index] = {...payload, ...product};
      return this.products[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.products.findIndex(product => product.id === id);
    if(index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }

}
