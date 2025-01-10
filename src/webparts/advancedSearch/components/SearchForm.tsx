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

export enum AdvancedSearchSessionKeys {
    JobTitle = 'gcx-cm-jobTitle',
    ClassificationCode = 'gcx-cm-classificationCode',
    ClassificationLevel = 'gcx-cm-classificationLevel',
    Department = 'gcx-cm-department',
    Duration = 'gcx-cm-duration',
    LanguageRequirement = 'gcx-cm-languageRequirement',
    Location = 'gcx-cm-location',
}

const SearchForm = (props: ISearchFormProps) => {
    const strings = Globals.getStrings();

    const [jobTitle, setJobTitle] = React.useState('');
    const [classificationCode, setClassificationCodeId] = React.useState('');
    const [classificationLevel, setClassificationLevelId] = React.useState('');
    const [department, setDepartmentId] = React.useState('');
    const [duration, setDurationId] = React.useState('');
    const [languageRequirement, setLanguageRequirementId] = React.useState('');
    const [location, setRegionId] = React.useState('');

    const SetSessionKeys = (): void => {
        sessionStorage.setItem(AdvancedSearchSessionKeys.JobTitle, jobTitle);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationCode, classificationCode);
        sessionStorage.setItem(AdvancedSearchSessionKeys.ClassificationLevel, classificationLevel);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Department, department);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Duration, duration);
        sessionStorage.setItem(AdvancedSearchSessionKeys.LanguageRequirement, languageRequirement);
        sessionStorage.setItem(AdvancedSearchSessionKeys.Location, location);
    }

    const ClearSessionKeys = (): void => {
        sessionStorage.removeItem(AdvancedSearchSessionKeys.JobTitle);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationCode);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.ClassificationLevel);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Department);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Duration);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.LanguageRequirement);
        sessionStorage.removeItem(AdvancedSearchSessionKeys.Location);
    }

    const ClearValues = (): void => {
        setJobTitle('');
        setDepartmentId('');
        setClassificationCodeId('');
        setClassificationLevelId('');
        setLanguageRequirementId('');
        setLanguageRequirementId('');
        setRegionId('');
        setDurationId('');

        ClearSessionKeys();
    };

    React.useEffect(() => {
        SetSessionKeys();
    }, [jobTitle, classificationCode, classificationLevel, department, duration, languageRequirement, location]);

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

    if (Globals.isOpen()){
        SetSessionKeys();
    } else {
        ClearSessionKeys();
    }

    return (
        <>
        <Stack>
            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-job-title-label'>
                    <b style={titleStyle}>
                        {strings.JobTitle}
                    </b>
                </label>
            </Stack>
            <TextField 
                id='txtJobTitle' 
                aria-labelledby='gcx-as-job-title-label'
                styles={{fieldGroup: { borderColor: borderColor }}}  
                onChange={(e) => setJobTitle(e.currentTarget.value)} 
                value={jobTitle} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-department-label'>
                    <b style={titleStyle}>
                        {strings.Department}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddDepartment' 
                aria-labelledby='gcx-as-department-label'
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
                selectedKey={department ? parseInt(department, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center' tokens={stackTokens}>
                <label id='gcx-as-classification-code-label'>
                    <b style={titleStyleNoPadding}>
                        {strings.ClassificationCode}:
                    </b>
                </label>
                <Dropdown 
                    id='ddClassificationCode' 
                    aria-labelledby='gcx-as-classification-code-label'
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
                    selectedKey={classificationCode ? parseInt(classificationCode, 10) : null} 
                />
                <label id='gcx-as-classification-level-label'>
                    <b style={titleStyleNoPadding}>
                        {strings.Level}:
                    </b>
                </label>
                <Dropdown 
                    id='ddClassificationLevel' 
                    aria-labelledby='gcx-as-classification-level-label'
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
                    selectedKey={classificationLevel ? parseInt(classificationLevel, 10) : null} 
                />
            </Stack><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-language-requirement-label'>
                    <b style={titleStyle}>
                        {strings.LanguageRequirement}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddLanguageRequirement' 
                aria-labelledby='gcx-as-language-requirement-label'
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
                selectedKey={languageRequirement ? parseInt(languageRequirement, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-location-label'>
                    <b style={titleStyle}>
                        {strings.Location}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddRegion' 
                aria-labelledby='gcx-as-location-label'
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
                selectedKey={location ? parseInt(location, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center'>
                <label id='gcx-as-duration-label'>
                    <b style={titleStyle}>
                        {strings.Duration}
                    </b>
                </label>
            </Stack>
            <Dropdown 
                id='ddDuration' 
                aria-labelledby='gcx-as-duration-label'
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
                selectedKey={duration ? parseInt(duration, 10) : null} 
            /><br />

            <Stack horizontal verticalAlign='center' horizontalAlign="end" tokens={stackTokens}>
                <DefaultButton 
                    id='advancedSearch-Clear'
                    aria-label={strings.btnClearAria}
                    onClick={() => {
                        ClearValues();
                    }}
                >
                    {strings.Clear}
                </DefaultButton>

                <PrimaryButton 
                    id='advancedSearch-Search'
                    aria-label={strings.btnSearchAria}
                >
                    {strings.Search}
                </PrimaryButton>
            </Stack>
        </Stack>
        </>
    );
}

export default  SearchForm