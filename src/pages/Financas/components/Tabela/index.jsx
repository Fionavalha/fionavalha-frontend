import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatarDinheiro } from "../../../../utils/formatador";

export function TabelaReceitas({ data = [], total = null }) {
  return (
    <Table className="bg-white w-full">
      <TableCaption className="bg-text-primary p-3 text-white font-medium">Receitas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2 text-left font-bold">CORTE</TableHead>
          <TableHead className="w-1/4 text-center font-bold">QTD</TableHead>
          <TableHead className="w-1/4 text-right font-bold">VALOR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 &&
          data.map((item) => (
            <TableRow key={item?.nome}>
              <TableCell className="w-1/2 text-left">{item?.nome}</TableCell>
              <TableCell className="w-1/4 text-center">{item?.qtd}</TableCell>
              <TableCell className="w-1/4 text-right">{formatarDinheiro(Number(item?.valor_total))}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-left font-bold" colSpan={2}>
            TOTAL
          </TableCell>
          <TableCell className="text-right font-bold ">{formatarDinheiro(Number(total?.valor_total))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function TabelaDespesas({ data = [], total = null }) {
  return (
    <Table className="bg-white w-full">
      <TableCaption className="bg-text-primary p-3 text-white font-medium">Despesas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-2/3 text-left font-bold">DESPESA</TableHead>
          <TableHead className="w-1/5 text-center font-bold">DATA</TableHead>
          <TableHead className="w-1/5 text-center font-bold">FIXA</TableHead>
          <TableHead className="w-1/5 text-right font-bold">VALOR</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length > 0 &&
          data.map((item) => (
            <TableRow key={item?.id_despesa}>
              <TableCell className="w-2/3 text-left">{item?.nome_despesa}</TableCell>
              <TableCell className="w-1/5 text-center">{item?.data_despesa}</TableCell>
              <TableCell className="w-1/5 text-center">{item?.fixa}</TableCell>
              <TableCell className="w-1/5 text-right">{formatarDinheiro(Number(item?.valor_despesa))}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className="text-left font-bold" colSpan={3}>
            TOTAL
          </TableCell>
          <TableCell className="text-right font-bold ">{formatarDinheiro(Number(total?.valor_total))}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export function TabelaTotal({ total = null }) {
  return (
    <Table className="bg-white w-full">
      <TableCaption className="bg-text-primary p-3 text-white font-medium">Total</TableCaption>
      <TableBody>
        <TableRow>
          <TableCell className="font-bold">TOTAL</TableCell>
          <TableCell className="text-right font-bold">{total}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
