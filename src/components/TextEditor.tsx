import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { i18nChangeLanguage } from '@wangeditor/editor';

i18nChangeLanguage('en');

interface Props {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
}

function TextEditor({ html, setHtml }: Props) {
  // editor 實體
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 工具列配置
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 編輯器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
  };

  // 即時銷毀 editor，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
    </>
  );
}

export default TextEditor;
