import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface EditorProps {
  id?: string;
  className?: string;
  name?: string;
  placeholder?: string;
  value?: any;
  rows?: number;
  onChange?(event: any, editor: any): void;
}

const Editor: React.FunctionComponent<EditorProps> = (props) => {
  const [editor, setEditor] = useState<any>();

  const onBeforeLoad = (e: any) => {
    setEditor(e.editor);
  }

  useEffect(() => {
    if (editor) {
      editor.setData(props.value);
    }
  }, [props.value]);

  return <React.Fragment>
    <CKEditor id={props.id}
      className={classNames("form-control", props.className)}
      name={props.name}
      placeholder={props.placeholder}
      row={props.rows ?? 8}
      editor={ClassicEditor}
      data={props.value}
      onChange={props.onChange}
      onReady={(editor: any) => {
        onBeforeLoad(editor);
        // You can store the "editor" and use when it is needed.
        // console.log("Editor is ready to use!", editor);
        editor.editing.view.change((writer: any) => {
          writer.setStyle(
            "height",
            "200px",
            editor.editing.view.document.getRoot()
          );
        });
      }} />
  </React.Fragment>
}

export default Editor
