import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  // -------- Usage of Params -------------

  // @Get('products/:id')
  // getProduct2(@Param('id') idProduct: string) {
  //   return `product with ID: ${idProduct}`;
  // }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED) // when we make a request, we'll get this status (ACCEPTED - 202)
  getProduct(@Param() params: any) {
    return {
      message: `product with ID: ${params.id}`
    };
  }

  // using express instead of "native" nest response
  /* getProduct(@Res() response: Response, @Param() params: any) {
    response.status(202).send({
      message: `product with ID: ${params.id}`
    })
  } */


  // -------- Usage of Query Params -------------

  @Get('')
  getProducts(
      @Query('limit') limit = 100, // params by default
      @Query('offset') offset = 0,
      @Query('brand') brand: string // waiting for params
    ) {
    return `products: limit => ${limit}; offset => ${offset}; brand => ${brand}`;
  }

  @Post('')
  create(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload
    }
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
    }
  }

}
