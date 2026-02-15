
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  File, Folder as FolderIcon, Upload, Search, Download, Trash2, 
  Info, Plus, History, CheckCircle2, AlertCircle, Loader2,
  FileText, Image as ImageIcon, Video, FileSpreadsheet, FileArchive,
  FileAudio, FileCode, FileJson, FileType, ChevronLeft, Wifi, WifiOff,
  CloudOff, Printer, Share2, Mail, FileOutput
} from 'lucide-react';
import { FileMetadata, Folder } from '../../types';

const API_URL = 'api/files.php'; 

const MOCK_FOLDERS: Folder[] = [
  { id: 'm1', name: 'Business Assets', path: '/Business Assets', parentId: null },
  { id: 'm2', name: 'Invoices 2024', path: '/Invoices 2024', parentId: null },
];

const MOCK_FILES: FileMetadata[] = [
  { id: 'f1', filename: 'Q4_Report.pdf', file_hash: 'd41d8cd98f00b204e9800998ecf8427e', content_type: 'application/pdf', size: 102400, upload_date: '2023-12-20', uploader_ip: '127.0.0.1', folder_path: '/', is_hidden: false, version: 1 },
];

const FileManager: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  
  const [isDragging, setIsDragging] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchItems = useCallback(async (path: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?action=list&path=${encodeURIComponent(path)}`);
      
      // Check if response is JSON (Ezyro often returns HTML for errors)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API returned non-JSON response. Check if api/files.php exists on server.");
      }

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setFiles(data.files || []);
      setFolders(data.folders || []);
      setApiStatus('online');
    } catch (error) {
      console.warn('API connection failed:', error);
      setApiStatus('offline');
      setFiles(MOCK_FILES);
      setFolders(MOCK_FOLDERS);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(currentPath);
  }, [currentPath, fetchItems]);

  const processFiles = async (fileList: FileList) => {
    for (const file of Array.from(fileList)) {
      if (apiStatus === 'offline') {
        alert("Demo Mode: Cannot upload to live server.");
        continue;
      }
      const formData = new FormData();
      formData.append('file', file);
      formData.append('path', currentPath);
      try {
        const response = await fetch(`${API_URL}?action=upload`, { method: 'POST', body: formData });
        const result = await response.json();
        if (result.success) fetchItems(currentPath);
        else alert(result.error);
      } catch (error) {
        alert('Upload failed. Check server connection.');
      }
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('image')) return <ImageIcon className="text-blue-500" />;
    if (type.includes('pdf')) return <FileText className="text-red-500" />;
    return <File className="text-gray-400" />;
  };

  return (
    <div className="h-full flex flex-col space-y-4 pb-20">
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <button onClick={() => setCurrentPath('/')} className="text-gray-400 font-bold hover:text-indigo-600 uppercase text-[10px] tracking-widest">Root</button>
          <span className="text-gray-200">/</span>
          <span className="text-indigo-600 font-black text-sm">{currentPath}</span>
          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[9px] font-black uppercase ${apiStatus === 'online' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
            {apiStatus === 'online' ? <Wifi className="w-3 h-3" /> : <CloudOff className="w-3 h-3" />}
            <span>{apiStatus === 'online' ? 'Server Live' : 'Demo Mode'}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => fileInputRef.current?.click()} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black shadow-lg shadow-indigo-100 uppercase tracking-widest"><Upload className="w-4 h-4 inline mr-2" /> Upload</button>
          <input type="file" ref={fileInputRef} className="hidden" multiple onChange={e => e.target.files && processFiles(e.target.files)} />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-6 overflow-hidden">
        <div className="flex-1 bg-white rounded-[2.5rem] border border-gray-200 overflow-y-auto p-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-8">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-indigo-600 opacity-20" /></div>
          ) : (
            <>
              {folders.map(f => (
                <div key={f.id} onDoubleClick={() => setCurrentPath(f.path)} onClick={() => setSelectedItem({...f, type: 'folder'})} className={`flex flex-col items-center p-6 rounded-3xl border transition-all cursor-pointer group ${selectedItem?.id === f.id ? 'bg-indigo-50 border-indigo-200' : 'border-transparent hover:bg-gray-50'}`}>
                  <FolderIcon className="w-14 h-14 text-yellow-400 fill-current mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black text-gray-700 truncate w-full text-center uppercase tracking-tight">{f.name}</span>
                </div>
              ))}
              {files.map(f => (
                <div key={f.id} onClick={() => setSelectedItem({...f, type: 'file'})} className={`flex flex-col items-center p-6 rounded-3xl border transition-all cursor-pointer group ${selectedItem?.id === f.id ? 'bg-indigo-50 border-indigo-200' : 'border-transparent hover:bg-gray-50'}`}>
                  <div className="w-14 h-14 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">{getFileIcon(f.content_type)}</div>
                  <span className="text-[10px] font-black text-gray-700 truncate w-full text-center uppercase tracking-tight">{f.filename}</span>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="w-full lg:w-80 bg-white rounded-[2.5rem] border border-gray-200 p-8 flex flex-col space-y-6">
          {selectedItem ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                {selectedItem.type === 'folder' ? <FolderIcon className="w-12 h-12 text-yellow-400" /> : getFileIcon(selectedItem.content_type)}
              </div>
              <h4 className="font-black text-gray-900 text-sm truncate">{selectedItem.filename || selectedItem.name}</h4>
              <button onClick={() => { if(confirm("Delete?")) fetchItems(currentPath); }} className="w-full py-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center justify-center">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-gray-300 opacity-20">
               <Info className="w-12 h-12 mb-4" />
               <p className="text-[10px] font-black uppercase tracking-widest">Select Item</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileManager;
