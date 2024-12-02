import { Stack, TextField, Button, IStackTokens, Dropdown, IDropdownOption } from "@fluentui/react";
import * as React from "react";

export interface ISearchFormProps {
    classificationCodeList: IDropdownOption[];
    classificationLevelList: any;
    departmentList: any;
    durationList: any;
    languageRequirementList: any;
    regionList: any;
}

const SearchForm = (props: ISearchFormProps) => {
    const [jobTitle, setJobTitle] = React.useState('');
    const [classificationCodeId, setClassificationCodeId] = React.useState('');
    const [classificationLevelId, setClassificationLevelId] = React.useState('');
    const [departmentId, setDepartmentId] = React.useState('');
    const [durationId, setDurationId] = React.useState('');
    const [languageRequirementId, setLanguageRequirementId] = React.useState('');
    const [regionId, setRegionId] = React.useState('');

    const stackTokens: IStackTokens = { childrenGap: 20 };

    const SubmitSearch =  async () => {
        let queryString:string = '';

        queryString = queryString.concat("Title=", jobTitle != '' ? jobTitle : '*');
        queryString = queryString.concat("&DepartmentId=", departmentId != '' ? departmentId : '*');
        queryString = queryString.concat("&ClassificationCodeId=", classificationCodeId != '' ? classificationCodeId : '*');
        queryString = queryString.concat("&ClassificationLevelId=", classificationLevelId != '' ? classificationLevelId : '*');
        queryString = queryString.concat("&LanguageRequirementId=", languageRequirementId != '' ? languageRequirementId : '*');
        queryString = queryString.concat("&RegionId=", regionId != '' ? regionId : '*');
        queryString = queryString.concat("&DurationId=", durationId != '' ? durationId : '*');

        console.log("queryString", queryString);

        // let a = document.createElement('a');
        // a.href = "https://devgcx.sharepoint.com/sites/CM-test/SitePages/Oliver's-Test-Page.aspx?" + queryString;
        // a.click();
    };

    const ClearValues =  () => {
        setJobTitle('');
        setDepartmentId('');
    };

    console.log("departmentId", departmentId);

    return (
        <>
        <h2>Hello, world</h2>
        <Stack horizontal verticalAlign='center'>
            <b>Job Title</b>
        </Stack>
        <TextField id='txtJobTitle' onChange={(e) => setJobTitle(e.currentTarget.value)} value={jobTitle} /><br />

        <Stack horizontal verticalAlign='center'>
            <b>Department</b>
        </Stack>
        <Dropdown id='ddDepartment' options={props.departmentList} onChange={(e, option) => setDepartmentId(option.key.toString())} selectedKey={departmentId} /><br />

        <Stack horizontal verticalAlign='center' tokens={stackTokens}>
            <b>Classification Code:</b>
            <Dropdown id='ddClassificationCode' options={props.classificationCodeList} onChange={(e, option) => setClassificationCodeId(option.key.toString())} />
            <b>Level:</b>
            <Dropdown id='ddClassificationLevel' options={props.classificationLevelList} onChange={(e, option) => setClassificationLevelId(option.key.toString())} />
        </Stack><br />

        <Stack horizontal verticalAlign='center'>
          <b>Language Requirement</b>
        </Stack>
        <Dropdown id='ddLanguageRequirement' options={props.languageRequirementList} onChange={(e, option) => setLanguageRequirementId(option.key.toString())} /><br />

        <Stack horizontal verticalAlign='center'>
          <b>Region</b>
        </Stack>
        <Dropdown id='ddRegion' options={props.regionList} onChange={(e, option) => setRegionId(option.key.toString())} /><br />

        <Stack horizontal verticalAlign='center'>
          <b>Duration</b>
        </Stack>
        <Dropdown id='ddDuration' options={props.durationList} onChange={(e, option) => setDurationId(option.key.toString())} /><br />

        <Stack horizontal verticalAlign='center' tokens={stackTokens}>
            <Button onClick={() => {SubmitSearch();}}>Search</Button>
            <Button onClick={() => {ClearValues();}}>Clear values</Button>
        </Stack>
        </>
    );
}

export default  SearchForm