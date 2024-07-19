import { Box } from "@cloudscape-design/components";

export const EmptyState = (props) => {
    const { title, subtitle, action } = props;

    return (
        <Box textAlign="center" color="inherit">
            <Box variant="strong" padding={{ bottom: 's' }} color="inherit">{title}</Box>
            <Box variant="p" color="inherit">{subtitle}</Box>
            {action}
        </Box>
    )
};