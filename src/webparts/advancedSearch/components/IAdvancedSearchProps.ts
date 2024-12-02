import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAdvancedSearchProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  selectedKey?: string[];
  //decisionChoiceCallback?:(option: string) => void;
  //searchText: string;
}
