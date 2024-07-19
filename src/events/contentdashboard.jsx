import React, { useState } from 'react';
import { useCollection } from "@cloudscape-design/collection-hooks";
import { Button, Header, Input, Select, Table, Link } from "@cloudscape-design/components";
import { events } from '../types';
import { consideringEventIds, goingToEventIds } from "../participation";
import { ANY, CONSIDERING, dateCellFormatter, dateSortingComparator, getMatchesStatus, getStatusCellFormatter, GOING, locationCellFormatter, matchesText, nameCellFormatter, nameSortingComparator, urlCellFormatter } from "./event/contant-table-utils";
import { EmptyState } from "./event/empty-state";

export const Contentdashboard = () => {
    const [filteringByStatus, setFilteringByStatus] = useState({ label: "Any Status", value: ANY });
    const matchesStatus = getMatchesStatus(goingToEventIds, consideringEventIds);
    const eventFilteringFunction = (x, text) => matchesText(x, text) && matchesStatus(x, filteringByStatus);
    const statusCellFormatter = getStatusCellFormatter(goingToEventIds, consideringEventIds);

    const columnDefinitions = [
        { id: "date", header: "Date", cell: dateCellFormatter, sortingComparator: dateSortingComparator, width: 240 },
        { id: "name", header: "Name", cell: nameCellFormatter, sortingComparator: nameSortingComparator },
        { id: "location", header: "Location", cell: locationCellFormatter },
        { id: "status", header: "Status", cell: statusCellFormatter },
        { id: "url", header: "Website", cell: urlCellFormatter },
    ];

    const { actions, collectionProps, filterProps, items, paginationProps } = useCollection(events, {
        sorting: { defaultState: { sortingColumn: { sortingComparator: dateSortingComparator } } },
        filtering: {
            empty: <EmptyState title="No instances" subtitle="No instances to display." />,
            noMatch: <EmptyState title="No matches" subtitle="We can't find a match." action={<Button onClick={() => actions.setFiltering('')}>Clear filter</Button>} />,
            filteringFunction: eventFilteringFunction
        },
    });

    return (
        <Table
            variant="full-page"
            header={<Header variant="h1" actions={<Link href='/events/new'><Button variant="primary" iconName="add-plus">Add new</Button></Link>}>All Events</Header>}
            stickyHeader={true}
            {...collectionProps}
            filter={
                <div className="input-container">
                    <div className="input-filter">
                        <Input
                            {...filterProps}
                            placeholder="Find events"
                            value={filterProps.filteringText}
                            onChange={event => actions.setFiltering(event.detail.value)}
                        />
                    </div>
                    <div className="select-filter">
                        <Select
                            selectedOption={filteringByStatus}
                            onChange={({ detail }) => setFilteringByStatus(detail.selectedOption)}
                            options={[{ label: "Any Status", value: ANY }, { label: "Going", value: GOING }, { label: "Considering", value: CONSIDERING }]}
                            selectedAriaLabel="Selected"
                            expandToViewport={true}
                        />
                    </div>
                </div>
            }
            wrapLines
            columnDefinitions={columnDefinitions}
            items={items}
        />
    );
}