'use client'
import { ReactNode, useState, SyntheticEvent, useEffect } from 'react';
import { Tabs, Tab, Typography, Box} from '@mui/material';
import RequestSent from '@/app/components/requestSent';
import RequestReceived from '@/app/components/requestReceived';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
        >
            <Box>
                {children}
            </Box>
        </div>
    );
}

export default function Requests() {
    const [value, setValue] = useState(0);

    useEffect(() => {
        setValue(0);
    }, [])

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className='w-full'>
            <Tabs value={value} onChange={handleChange} centered>
                <Tab label="Enviadas" value={0}/>
                <Tab label="Recebidas" value={1}/>
            </Tabs>
            <TabPanel value={value} index={0}><RequestSent /></TabPanel>
            <TabPanel value={value} index={1}><RequestReceived /></TabPanel>
        </Box>
    );
}
