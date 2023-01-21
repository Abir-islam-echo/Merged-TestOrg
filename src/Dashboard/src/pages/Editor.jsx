import React from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';

import { Header, Sidebar } from '../components';
import { EditorData } from '../data/dummy';

const Editor = () => (

  <div className='c-mt flex mb-52'>
    <div className="min-w-[18rem] fixed sidebar dark:bg-secondary-dark-bg bg-white z-40 mt-[-67px]">
      <Sidebar />
    </div>
    <div className='min-w-[18rem]'></div>

    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl w-full">
      <Header category="App" title="Code Editor" />
      <RichTextEditorComponent>
        <EditorData />
        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
      </RichTextEditorComponent>
    </div>
  </div>

);
export default Editor;
