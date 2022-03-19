import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get(':id/products/:producId')
  getCategory(@Param('productId') productId: string, @Param('id') id: string) {
    return `product ${productId} and category ${id}`;
  }
}
