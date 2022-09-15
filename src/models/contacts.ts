import {Contact, Priority, Address, CompanyContact} from './misc';

export interface PropertyOwner {
  id: string;
  additionalInfo: Priority;
  contact: CompanyContact;
  name: string;
  labels: string[];
  postalAddress: Address;
  serviceCompanyId: string;
}

export interface ContactBody {
  propertyContactPerson: Partial<{
    externalId: string;
    roles: string[];
    propertyOwnerId?: string;
  }>;
  userAccount: Partial<{
    category: string;
    contact: Partial<Contact>;
    firstName: string;
    lastName: string;
    photoUrl: string;
    title: string;
    username: string;
    serviceCompanyId?: string;
  }>;
}
