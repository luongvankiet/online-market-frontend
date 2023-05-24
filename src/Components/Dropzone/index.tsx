import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import utils from '../../Utils';

interface DropzoneProps {
  files: any[];
  setFiles?(files: any): void;
}

const Dropzone: React.FunctionComponent<DropzoneProps> = ({ files = [], setFiles }) => {
  const [images, setImages] = useState<any>([]);
  const {
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: (acceptedFiles: any) => {
      setFiles && setFiles(acceptedFiles);
    }
  });

  const thumbs = images.map((file: any) => (
    <div style={{
      display: 'inline-flex',
      borderRadius: 2,
      border: '1px solid #eaeaea',
      marginBottom: 8,
      marginRight: 8,
      width: 100,
      height: 100,
      padding: 4,
      boxSizing: 'border-box'
    }} key={utils.newGuid()}>
      <div style={{
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
      }}>
        <img
          src={file.preview}
          style={{
            display: 'block',
            width: 'auto',
            height: '100%'
          }}
          alt=""
        />
      </div>
    </div>
  ));

  useEffect(() => {
    setImages(files.map((file: any) => {
      if (file) {
        if (file?.name) {
          return Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        } else {
          return Object.assign(file, {
            preview: file
          })
        }
      }

      return {preview: ''};
    }));
  }, [files]);

  return (
    <section>
      <div {...getRootProps({ className: 'dropzone' })} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#fafafa',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
      }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
      }}>
        {thumbs}
      </aside>
    </section>
  );
}

export default Dropzone;
