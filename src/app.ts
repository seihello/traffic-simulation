import { ProjectInput } from "./components/ProjectInput.js";
import { ProjectList } from "./components/project-list.js";
import { ProjectStatus } from './models/project.js';
import { projectState } from './components/ProjectState.js';
import { TrashBox } from './components/trash-box.js';

new ProjectInput();
new ProjectList(ProjectStatus.Active);
new ProjectList(ProjectStatus.Finished);
new TrashBox();

projectState.updateListeners();