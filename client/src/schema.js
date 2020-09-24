import * as yup from 'yup';

export const formInputSchema = yup.object({
  name: yup.string().required(),
  winnings: yup.number().positive().integer().required(),
  country: yup.string().required(),
  imageUrl: yup
    .string()
    .matches(
      /((https?):\/\/)?(www.)?(i.pravatar.cc\/)[a-z0-9]+(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    ),
});

export const paginationTopSchema = yup.object({
  perPage: yup.number().positive().integer().required(),
});
