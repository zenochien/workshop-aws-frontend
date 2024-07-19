import { Badge } from "@cloudscape-design/components";
import { Link } from "@cloudscape-design/components";

export const ANY = 'ANY';
export const GOING = 'GOING';
export const CONSIDERING = 'CONSIDERING';

export const isAny = (status) => status.value === ANY;
export const isGoing = (status) => status.value === GOING;
export const isConsidering = (status) => status.value === CONSIDERING;

export const matchesText = (x, text) => {
    const regex = new RegExp(text, 'i'); // i stands for case-insensitive
    return regex.test(x.name) || regex.test(x.location);
};

export const getMatchesStatus = (goingEventIds, consideringEventIds) => (x, status) =>
    isAny(status) ||
    (isGoing(status) && goingEventIds.includes(x.id)) ||
    (isConsidering(status) && consideringEventIds.includes(x.id));

export const dateCellFormatter = (x) => x.startDate === x.endDate
    ? new Date(x.startDate).toLocaleDateString()
    : `${new Date(x.startDate).toLocaleDateString()} - ${new Date(x.endDate).toLocaleDateString()}`;

export const nameCellFormatter = (x) => (
    <Link fontSize="body-m" href={`/events/${x.id}`}>
        <b>{x.name}</b>
    </Link>
);

export const locationCellFormatter = (x) => x.location;

export const getStatusCellFormatter = (goingEventIds, consideringEventIds) => (x) => (
    <>
        {goingEventIds.includes(x.id) && <Badge color="green">Going</Badge>}
        {' '}
        {consideringEventIds.includes(x.id) && <Badge color="grey">Considering</Badge>}
    </>
);

export const urlCellFormatter = (x) => (
    <Link external href={x.url}>Website</Link>
);

export const dateSortingComparator = (x, y) => new Date(x.startDate).getTime() - new Date(y.startDate).getTime();
export const nameSortingComparator = (x, y) => x.name.localeCompare(y.name);