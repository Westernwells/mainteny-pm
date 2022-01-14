import {useServiceOrders} from 'hooks/reactQuery/useServiceOrder';
import {IssueCard} from 'pages/UnitDetails/Tabs/IssueHistory/IssueCard';

export const RelatedTo = () => {
  const serviceOrders = useServiceOrders({});
  console.log(serviceOrders.data?.data[0]!);
  return <h1>Needs API</h1>;
};
