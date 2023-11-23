import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import { useController } from 'react-hook-form';

const defaultFonts = [
  'Arial',
  'Comic Sans MS',
  'Courier New',
  'Impact',
  'Georgia',
  'Tahoma',
  'Trebuchet MS',
  'Verdana',
];
export const MySunEditor = ({ control, errorMessage, ...props }: any) => {
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: '',
  });
  const sortedFontOptions = [
    'Logical',
    'Salesforce Sans',
    'Garamond',
    'Sans-Serif',
    'Serif',
    'Times New Roman',
    'Helvetica',
    ...defaultFonts,
  ].sort();
  return (
    <div className="text-editor">
      <label
        htmlFor={props.id || props.name}
        className="block capitalize mb-2 text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      {/* <EditorToolbar /> */}
      <SunEditor
        setContents={field.value}
        // onChange={setValues}
        setOptions={{
          buttonList: [
            ['undo', 'redo'],
            ['font', 'fontSize'],
            // ['paragraphStyle', 'blockquote'],
            [
              'bold',
              'underline',
              'italic',
              'strike',
              'subscript',
              'superscript',
            ],
            ['fontColor', 'hiliteColor'],
            ['align', 'list', 'lineHeight'],
            ['outdent', 'indent'],

            ['table', 'horizontalRule', 'link', 'image', 'video'],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            // ["fullScreen", "showBlocks", "codeView"],
            ['preview', 'print'],
            ['removeFormat'],

            // ['save', 'template'],
            // '/', Line break
          ], // Or Array of button list, eg. [['font', 'align'], ['image']]
          defaultTag: 'div',
          minHeight: '300px',
          showPathLabel: false,
          font: sortedFontOptions,
        }}
        {...field}
        {...props}
      />

      <div className="text-sm text-red-500">{errorMessage}</div>
    </div>
  );
};

export default MySunEditor;
