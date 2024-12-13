/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, TextField, PrimaryButton, DefaultButton, IStackTokens, Dropdown, IDropdownOption  } from "@fluentui/react";
import * as React from "react";
import { Globals } from "../Globals";

export interface ISearchFormProps {
    classificationCodeList: IDropdownOption[];
    classificationLevelList: any;
    departmentList: any;
    durationList: any;
    languageRequirementList: any;
    regionList: any;
}

enum AdvancedSearchSessionKeys {
    JobTitle = 'gcx-cm-jobTitle',
    ClassificationCodeId = 'gcx-cm-classificationCodeId',
    ClassificationLevelId = 'gcx-cm-classificationLevelId',
    DepartmentId = 'gcx-cm-departmentId',
    DurationId = 'gcx-cm-durationId',
    LanguageRequirementId = 'gcx-cm-languageRequirementId',
    RegionId = 'gcx-cm-regionId',
}

const SearchForm = (props: ISearchFormProps) => {
    const strings = Globals.getStrings();

    const [jobTitle, setJobTitle] = React.useState('');
    const [classificationCodeId, setClassificationCodeId] = React.useState('');
    const [classificationLevelId, setClassificationLevelId] = React.useState('');
    const [departmentId, setDepartmentId] = React.useState('');
    const [durationId, setDurationId] = React.useState('');
    const [languageRequirementId, setLanguageRequirementId] = React.useState('');
    const [regionId, setRegionId] = React.useState('');

    React.useEffect(() => {
        sessionStorage.setItem(AdvancedSearchSessionKeys.JobTitle, jobTitle);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationCodeId, classificationCodeId);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationLevelId, classificationLevelId);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DepartmentId, departmentId);
        sessionStorage.setItem(AdvancedSearchSessionKeys.DurationId, durationId);
        sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageRequirementId, languageRequirementId);
        sessionStorage.setItem(AdvancedSearchSessionKeys.RegionId, regionId);
    }, [jobTitle, classificationCodeId, classificationLevelId, departmentId, durationId, languageRequirementId, regionId]);

    const ClearValues = (): void => {
        setJobTitle('');
        setDepartmentId('');
        setClassificationCodeId('');
        setClassificationLevelId('');
        setLanguageRequirementId('');
        setLanguageRequirementId('');
        setRegionId('');
        setDurationId('');

        sessionStorage.removeItem(AdvancedSearchSessionKeys.JobTitle);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationCodeId);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationLevelId);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DepartmentId);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.DurationId);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageRequirementId);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.RegionId);
    };

    const titleStyle = {
        fontWeight: '500', 
        paddingBottom: '4px', 
        fontSize: '14px'
    }

    const titleStyleNoPadding = {
        ...titleStyle,
        paddingBottom: 'unset'
    };

    const borderColor: string = '#c2c2c2';
    const stackTokens: IStackTokens = { childrenGap: 20 };

    return (
        <>
        <Stack>
            <Stack horizontal verticalAlign='center'>
                <b style={titleStyle}>
                    {strings.JobTitle}
                </b>
            </Stack>
            <TextField 
                id='txtJobTitle' 
                styles={{fieldGroup: { borderColor: borderColor }}}  
                onChange={(e) => setJobTitle(e.currentTarget.value)} 
                value={jobTitle} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <b style={titleStyle}>
                    {strings.Department}
                </b>
            </Stack>
            <Dropdown 
                id='ddDepartment' 
                styles={{title: { borderColor: borderColor }}} 
                options={props.departmentList} 
                onChange={(e, option) => { 
                    if (option) {
                        setDepartmentId(option.key.toString());
                    }
                    else {
                        setDepartmentId('')
                    }
                }}
                selectedKey={departmentId ? parseInt(departmentId, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center' tokens={stackTokens}>
                <b style={titleStyleNoPadding}>
                    {strings.ClassificationCode}:
                </b>
                <Dropdown 
                    id='ddClassificationCode' 
                    styles={{title: { borderColor: borderColor }}} 
                    options={props.classificationCodeList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setClassificationCodeId(option.key.toString());
                        }
                        else {
                            setClassificationCodeId('')
                        }
                    }}
                    selectedKey={classificationCodeId ? parseInt(classificationCodeId, 10) : null} 
                />
                <b style={titleStyleNoPadding}>
                    {strings.Level}:
                </b>
                <Dropdown 
                    id='ddClassificationLevel' 
                    styles={{title: { borderColor: borderColor }}} 
                    options={props.classificationLevelList} 
                    onChange={(e, option) => { 
                        if (option) {
                            setClassificationLevelId(option.key.toString());
                        }
                        else {
                            setClassificationLevelId('')
                        }
                    }}
                    selectedKey={classificationLevelId ? parseInt(classificationLevelId, 10) : null} 
                />
            </Stack><br />

            <Stack horizontal verticalAlign='center'>
            <b style={titleStyle}>
                {strings.LanguageRequirement}
            </b>
            </Stack>
            <Dropdown 
                id='ddLanguageRequirement' 
                styles={{title: { borderColor: borderColor }}} 
                options={props.languageRequirementList} 
                onChange={(e, option) => { 
                    if (option) {
                        setLanguageRequirementId(option.key.toString());
                    }
                    else {
                        setLanguageRequirementId('')
                    }
                }}
                selectedKey={languageRequirementId ? parseInt(languageRequirementId, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center'>
            <b style={titleStyle}>
                {strings.Location}
            </b>
            </Stack>
            <Dropdown 
                id='ddRegion' 
                styles={{title: { borderColor: borderColor }}} 
                options={props.regionList} 
                onChange={(e, option) => { 
                    if (option) {
                        setRegionId(option.key.toString());
                    }
                    else {
                        setRegionId('')
                    }
                }} 
                selectedKey={regionId ? parseInt(regionId, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center'>
            <b style={titleStyle}>
                {strings.Duration}
            </b>
            </Stack>
            <Dropdown 
                id='ddDuration' 
                styles={{title: { borderColor: borderColor }}} 
                options={props.durationList} 
                onChange={(e, option) => { 
                    if (option) {
                        setDurationId(option.key.toString());
                    }
                    else {
                        setDurationId('')
                    }
                }} 
                selectedKey={durationId ? parseInt(durationId, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center' horizontalAlign="end" tokens={stackTokens}>
                <DefaultButton id='advancedSearch-Clear'
                    onClick={() => {
                        ClearValues();
                    }}>
                    {strings.Clear}
                </DefaultButton>
                <PrimaryButton id='advancedSearch-Search'>
                    {strings.Search}
                </PrimaryButton>
            </Stack>
        </Stack>
        </>
    );
}

export default  SearchForm