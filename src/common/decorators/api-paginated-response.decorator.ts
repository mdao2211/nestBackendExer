import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiPaginatedResponse = <T extends Type<any>>(model: T) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              meta: {
                type: 'object',
                properties: {
                  total: {
                    type: 'number',
                  },
                  page: {
                    type: 'number',
                  },
                  limit: {
                    type: 'number',
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};
