import {Elevator} from '../../../models/elevator';
import {DataGridLayout} from '../../../components/DataGridLayout';
import {columns, makeRows} from './UnitDataGridProps';

interface Props {
  units: Elevator[];
}

export const Units = ({units}: Props) => (
  <DataGridLayout rows={makeRows(units)} columns={columns} hideFooter />
);
