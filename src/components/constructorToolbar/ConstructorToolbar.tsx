import React, { useState } from "react";
import { observer } from "mobx-react";
import { Box, InputAdornment, Tab, Tabs, TextField } from "@mui/material";

import '../../styles/ConstructorToolbar.css';
import templateInfoStore, { ITemplateElement } from "../../store/templateInfoStore";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const {children, value, index} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`panel-${index}`}
        >
            {value === index && (
                <Box sx={{ p: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const ConstructorToolbar = () => {
    
    const [tabValue, setTabValue] = useState<number>(0);

    const tabChange = (event: React.SyntheticEvent, newTabValue: number) => {
        setTabValue(newTabValue);
    };

    const handleBoxDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const x = event.clientX;
        const y = event.clientY;
        const newTemplateElement: ITemplateElement = {
            name: "NewBox",
            attributes: {
                "x": x,
                "y": y,
                "dms:widget": "string"
            },
            children: [],   
            value: ""
        };
        templateInfoStore.addElement(newTemplateElement)
    };

    const handleTableDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
        const x = event.clientX;
        const y = event.clientY;
        const newTemplateElement: ITemplateElement = {
            name: "NewTable",
            attributes: {
                "x": x,
                "y": y,
                "dms:widget": "table",
                "width": "975",
                "height": "200"
            },
            children: [
                {
                    name: "columns",
                    attributes: {
                        "height": 35
                    },
                    children: [
                        {
                            name: "cell1",
                            attributes: {
                                "dms:title": "Тест1",
                                "dms:widget": "number",
                                "width": 25
                            },
                            children: [],
                            value: ""
                        },
                    ],
                    value: ""
                },
                {
                    name: "record",
                    attributes: {
                        "height": 35
                    },
                    children: [
                        {
                            name: "cell1",
                            attributes: {
                                "dms:widget": "number",
                                "width": 25
                            },
                            children: [],
                            value: ""
                        },
                    ],
                    value: ""
                }
            ],   
            value: ""
        };
        templateInfoStore.addElement(newTemplateElement)
    };

    return (
        <Box className="toobarDiv">
            <Tabs value={tabValue} onChange={tabChange}>
                <Tab label="Обьект"/>
                <Tab label="Виджеты"/>
            </Tabs>
            <TabPanel value={tabValue} index={0}>
                <Box>Координаты:</Box>
                <TextField 
                    id="coordX"
                    sx={{m: 1, width: '10ch'}}
                    variant="standard"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">X:</InputAdornment>,
                    }}
                />
                <TextField
                    id="coordY"
                    sx={{m: 1, width: '10ch'}}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Y:</InputAdornment>,
                    }}
                    variant="standard"
                />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                
                Виджеты
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    className="widgetIcon"
                    draggable
                    onDragEnd={handleBoxDragEnd}
                >
                    Box
                </Box>
                
                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: '#800080',
                        '&:hover': {
                        backgroundColor: '#8B008B',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    className="widgetIcon"
                    draggable
                    onDragEnd={handleTableDragEnd}
                >
                    Table
                </Box>

                <Box
                    sx={{
                        width: 60,
                        height: 60,
                        backgroundColor: '#DA70D6',
                        '&:hover': {
                        backgroundColor: '#DA70D6',
                        opacity: [0.9, 0.8, 0.7],
                        },
                    }}
                    className="widgetIcon"
                    draggable
                    onDragEnd={handleBoxDragEnd}
                >
                    Time
                </Box>
            </TabPanel>
        </Box>
    );
}

export default observer(ConstructorToolbar);