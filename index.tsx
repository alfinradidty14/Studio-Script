import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Home,
  FolderKanban,
  CheckSquare,
  Settings,
  Briefcase,
  PenTool,
  Tag,
  Eye,
  Calendar,
  Camera,
  Save,
  RefreshCw,
  Lock,
  Unlock,
  FileText,
  Plus,
  FolderPlus,
  Folder,
  Clock,
  ChevronDown,
  ChevronRight,
  Search,
  MoreHorizontal,
  Printer,
  Download,
  Share2,
  Play,
  Sparkles,
  AlignLeft,
  User,
  MessageSquare,
  Parentheses,
  ArrowRightLeft,
  Film,
  Hash,
  X,
  Check,
  AlertCircle,
  Trash2,
  Copy,
  Layers,
  Sliders,
  Maximize2,
  Minimize2,
  History,
  List,
  BookOpen,
  Clapperboard,
  MapPin,
  Users,
  Package,
  Shirt,
  Video,
  ArrowUp,
  ArrowDown,
  CornerDownLeft
} from 'lucide-react';

// ==========================================
// INITIAL DEMO DATA (MATCHING SCREENSHOT)
// ==========================================
const INITIAL_FOLDERS = [
  {
    id: 'folder-mv-nerdos',
    name: 'MV - NERDOS BAND',
    category: 'Music Video Production',
    color: '#007AFF', // Apple Blue
    updatedAt: 'Oct 15, 2:57pm',
    location: 'Kampus & Studio Ponorogo',
    description: 'Project Music Video & Narrative Intro untuk Nerdos Band.'
  },
  {
    id: 'folder-titik-jeda',
    name: 'Short Film - Titik Jeda',
    category: 'Short Film',
    color: '#5856D6', // Apple Indigo
    updatedAt: 'Oct 14, 8:15pm',
    location: 'Surabaya & Malang',
    description: 'Film pendek drama reflektif tentang persimpangan karier dan masa muda.'
  },
  {
    id: 'folder-yearbook',
    name: 'Yearbook Cinematography',
    category: 'Commercial / School',
    color: '#FF9500', // Apple Orange
    updatedAt: 'Oct 12, 4:30pm',
    location: 'SMPN 1 Jetis & Slahung',
    description: 'Konsep naskah video angkatan dan profil sekolah.'
  },
  {
    id: 'folder-iklan',
    name: 'TVC & Brand Commercial',
    category: 'Commercial',
    color: '#34C759', // Apple Green
    updatedAt: 'Oct 09, 11:20am',
    location: 'Mourise Studio Stage A',
    description: 'Draft storyboard dan naskah iklan produk klien.'
  }
];

const INITIAL_DRAFTS = [
  {
    id: 'draft-nerdos-main',
    folderId: 'folder-mv-nerdos',
    title: 'MV - NERDOS BAND',
    subtitle: 'Narrative Opening & Music Video Script',
    author: 'Alfin Radidtya',
    lastSaved: '2:57pm',
    lastEditedDate: 'Oct 15 @ 2:57pm',
    createdDate: 'May 21 @ 5:20pm',
    activeVersion: 'v1',
    isSynced: false,
    isLocked: false,
    showSceneNumbers: true,
    revisions: [
      {
        id: 'rev-v1',
        version: 'v1',
        name: 'MV - NERDOS BAND',
        author: 'Alfin Radidtya',
        timestamp: 'May 21 @ 5:20pm',
        notes: 'Initial narrative opening draft di gedung fakultas'
      },
      {
        id: 'rev-v2',
        version: 'v2',
        name: 'MV - NERDOS BAND (Director Cut)',
        author: 'Alfin Radidtya',
        timestamp: 'Oct 15 @ 2:57pm',
        notes: 'Revisi blocking koridor lantai dua & insert jadwal'
      }
    ],
    blocks: [
      {
        id: 'b-1',
        type: 'slugline',
        text: 'INT. GEDUNG FAKULTAS. DAY',
        sceneNumber: '1'
      },
      {
        id: 'b-2',
        type: 'action',
        text: 'Suasana kampus ramai oleh mahasiswa yang berlalu-lalang. Beberapa mahasiswa baru berjalan berkelompok, sebagian lainnya sibuk mencari ruang kelas.'
      },
      {
        id: 'b-3',
        type: 'action',
        text: 'Seorang MAHASISWA BARU (19), membawa tas ransel dan buku catatan, berdiri di depan papan informasi. Matanya mencari sebuah tulisan.'
      },
      {
        id: 'b-4',
        type: 'shot',
        text: 'INSERT - PAPAN JADWAL PERKULIAHAN'
      },
      {
        id: 'b-5',
        type: 'action',
        text: 'DESAIN VISUAL – RUANG 204 – 08.00 WIB.'
      },
      {
        id: 'b-6',
        type: 'action',
        text: 'Mahasiswa baru itu tersenyum kecil. Ia memeriksa jam tangannya.'
      },
      {
        id: 'b-7',
        type: 'character',
        text: 'MAHASISWA BARU'
      },
      {
        id: 'b-8',
        type: 'parenthetical',
        text: '(pelan, kepada diri sendiri)'
      },
      {
        id: 'b-9',
        type: 'dialogue',
        text: 'Desain Visual. Oke, ruang 204.'
      },
      {
        id: 'b-10',
        type: 'action',
        text: 'Ia membetulkan posisi tasnya, lalu berjalan menyusuri koridor.'
      },
      {
        id: 'b-11',
        type: 'transition',
        text: 'CUT TO:'
      },
      {
        id: 'b-12',
        type: 'slugline',
        text: 'INT. KORIDOR LANTAI DUA. DAY',
        sceneNumber: '2'
      },
      {
        id: 'b-13',
        type: 'action',
        text: 'Mahasiswa baru itu berhenti di depan pintu bertuliskan RUANG 204.'
      },
      {
        id: 'b-14',
        type: 'action',
        text: 'Dari dalam terdengar suara mahasiswa berbincang dan kursi bergeser.'
      },
      {
        id: 'b-15',
        type: 'action',
        text: 'Ia mengintip melalui kaca kecil di pintu. Beberapa mahasiswa sudah duduk di dalam kelas.'
      },
      {
        id: 'b-16',
        type: 'action',
        text: 'Ia menarik napas panjang, merapikan kemejanya, lalu tersenyum gugup.'
      },
      {
        id: 'b-17',
        type: 'character',
        text: 'MAHASISWA BARU (V.O.)'
      },
      {
        id: 'b-18',
        type: 'dialogue',
        text: 'Hari pertama selalu terasa seperti panggung yang belum pernah kita coba sebelumnya. Tapi begitu pintu ini terbuka... musiknya dimulai.'
      },
      {
        id: 'b-19',
        type: 'transition',
        text: 'SMASH CUT TO:'
      },
      {
        id: 'b-20',
        type: 'slugline',
        text: 'INT. STUDIO MUSIK KAMPUS. NIGHT',
        sceneNumber: '3'
      },
      {
        id: 'b-21',
        type: 'action',
        text: 'Lampu neon menyala redup. NERDOS BAND bersiap dengan instrumen masing-masing. Ketukan stik drum membuka intro lagu dengan energi penuh.'
      }
    ],
    breakdown: {
      '1': {
        cast: ['MAHASISWA BARU (19)'],
        extras: ['Mahasiswa Berlalu-lalang (15 orang)'],
        props: ['Tas Ransel', 'Buku Catatan', 'Jam Tangan'],
        setDressing: ['Papan Informasi', 'Jadwal Perkuliahan Ruang 204'],
        wardrobe: ['Kemeja Casual Mahasiswa Baru']
      },
      '2': {
        cast: ['MAHASISWA BARU (19)'],
        extras: ['Mahasiswa di Dalam Kelas (10 orang)'],
        props: ['Tas Ransel'],
        setDressing: ['Pintu Ruang 204 dengan Kaca Kecil', 'Kursi Kelas'],
        wardrobe: ['Kemeja Rapi (Continuity Scene 1)']
      },
      '3': {
        cast: ['NERDOS BAND (Full Member)', 'MAHASISWA BARU'],
        extras: [],
        props: ['Gitar Elektrik', 'Bass', 'Drum Set', 'Amplifier'],
        setDressing: ['Lampu Neon Studio', 'Acoustic Foam'],
        wardrobe: ['Band Performance Outfit']
      }
    },
    shots: [
      {
        id: 'shot-1a',
        scene: '1',
        shotNumber: '1A',
        size: 'WS (Wide Shot)',
        lens: '24mm f/2.8',
        movement: 'Gimbal Tracking',
        subject: 'Suasana lobi gedung fakultas yang ramai mahasiswa baru',
        aspect: '16:9'
      },
      {
        id: 'shot-1b',
        scene: '1',
        shotNumber: '1B',
        size: 'INSERT / ECU',
        lens: '50mm Macro',
        movement: 'Static Tripod',
        subject: 'Tulisan DESAIN VISUAL - RUANG 204 - 08.00 WIB di papan jadwal',
        aspect: '16:9'
      },
      {
        id: 'shot-1c',
        scene: '1',
        shotNumber: '1C',
        size: 'MCU (Medium Close Up)',
        lens: '35mm f/1.4',
        movement: 'Handheld Subtle',
        subject: 'Mahasiswa Baru melirik jam tangan lalu berbicara pelan',
        aspect: '16:9'
      },
      {
        id: 'shot-2a',
        scene: '2',
        shotNumber: '2A',
        size: 'MS (Medium Shot)',
        lens: '50mm f/1.4',
        movement: 'Slow Push-In',
        subject: 'Mahasiswa Baru mengintip dari kaca kecil pintu Ruang 204',
        aspect: '16:9'
      },
      {
        id: 'shot-3a',
        scene: '3',
        shotNumber: '3A',
        size: 'LOW ANGLE WS',
        lens: '16mm Anamorphic',
        movement: 'Dynamic Whip Pan',
        subject: 'Transisi energi ke Nerdos Band mulai memainkan intro',
        aspect: '2.39:1'
      }
    ]
  },
  {
    id: 'draft-nerdos-performance',
    folderId: 'folder-mv-nerdos',
    title: 'MV - NERDOS BAND (Performance Cut)',
    subtitle: 'Full Band Performance & B-Roll Cue Sheet',
    author: 'Alfin Radidtya',
    lastSaved: 'Yesterday',
    lastEditedDate: 'Oct 14 @ 6:10pm',
    createdDate: 'Jun 02 @ 1:15pm',
    activeVersion: 'v1',
    isSynced: true,
    isLocked: false,
    showSceneNumbers: true,
    revisions: [
      {
        id: 'rev-perf-1',
        version: 'v1',
        name: 'Performance Sync Script',
        author: 'Alfin Radidtya',
        timestamp: 'Oct 14 @ 6:10pm',
        notes: 'Timecode sync dengan lagu master'
      }
    ],
    blocks: [
      {
        id: 'bp-1',
        type: 'slugline',
        text: 'EXT. ROOFTOP GEDUNG KAMPUS. MAGIC HOUR',
        sceneNumber: '1'
      },
      {
        id: 'bp-2',
        type: 'action',
        text: 'Cahaya sore keemasan menyinari siluet personel NERDOS BAND. Kamera bergerak melingkar (360 orbit) mengelilingi vokalis.'
      },
      {
        id: 'bp-3',
        type: 'shot',
        text: 'TIMECODE 01:12 - CHORUS PERTAMA MASUK'
      },
      {
        id: 'bp-4',
        type: 'character',
        text: 'VOKALIS NERDOS'
      },
      {
        id: 'bp-5',
        type: 'parenthetical',
        text: '(lip-sync penuh energi ke arah lensa)'
      },
      {
        id: 'bp-6',
        type: 'dialogue',
        text: 'Kita berlari mengejar batas waktu yang tak pernah menunggu!'
      }
    ],
    breakdown: {},
    shots: []
  },
  {
    id: 'draft-titik-jeda-1',
    folderId: 'folder-titik-jeda',
    title: 'TITIK JEDA - FINAL DRAFT',
    subtitle: 'Festival Submission Screenplay',
    author: 'Alfin Radidtya',
    lastSaved: 'Oct 14',
    lastEditedDate: 'Oct 14 @ 8:15pm',
    createdDate: 'Sep 18 @ 9:00am',
    activeVersion: 'v3',
    isSynced: true,
    isLocked: true,
    showSceneNumbers: true,
    revisions: [
      {
        id: 'rev-tj-3',
        version: 'v3',
        name: 'TITIK JEDA - Locked Festival Cut',
        author: 'Alfin Radidtya',
        timestamp: 'Oct 14 @ 8:15pm',
        notes: 'Final polish dialog adegan stasiun'
      }
    ],
    blocks: [
      {
        id: 'btj-1',
        type: 'slugline',
        text: 'EXT. PERON STASIUN GUBENG. NIGHT',
        sceneNumber: '1'
      },
      {
        id: 'btj-2',
        type: 'action',
        text: 'Hujan rintik membasahi peron. RAKA (23) duduk sendiri memandangi koper kecil di samping kakinya. Pengumuman keberangkatan kereta menggema.'
      },
      {
        id: 'btj-3',
        type: 'character',
        text: 'RAKA'
      },
      {
        id: 'btj-4',
        type: 'parenthetical',
        text: '(menghela napas)'
      },
      {
        id: 'btj-5',
        type: 'dialogue',
        text: 'Pulang bukan berarti kalah. Kadang kita cuma butuh jeda.'
      }
    ],
    breakdown: {},
    shots: []
  },
  {
    id: 'draft-yearbook-jetis',
    folderId: 'folder-yearbook',
    title: 'YEARBOOK - SMPN 1 JETIS',
    subtitle: 'Cinematic Nostalgia Concept Script',
    author: 'Alfin Radidtya',
    lastSaved: 'Oct 12',
    lastEditedDate: 'Oct 12 @ 4:30pm',
    createdDate: 'Oct 01 @ 10:00am',
    activeVersion: 'v2',
    isSynced: true,
    isLocked: false,
    showSceneNumbers: true,
    revisions: [
      {
        id: 'rev-yb-2',
        version: 'v2',
        name: 'SMPN 1 Jetis - Approved Concept',
        author: 'Alfin Radidtya',
        timestamp: 'Oct 12 @ 4:30pm',
        notes: 'Penambahan drone shot lapangan basket'
      }
    ],
    blocks: [
      {
        id: 'byb-1',
        type: 'slugline',
        text: 'EXT. LAPANGAN BASKET SEKOLAH. MORNING',
        sceneNumber: '1'
      },
      {
        id: 'byb-2',
        type: 'action',
        text: 'Bola basket memantul slow-motion. Siswa-siswi berseragam putih biru berlarian membentuk formasi angkatan.'
      }
    ],
    breakdown: {},
    shots: []
  }
];

const INITIAL_TASKS = [
  { id: 't-1', title: 'Lock Script MV - NERDOS BAND v1 ke Tim Kamera', project: 'MV - NERDOS BAND', due: 'Hari Ini', done: false, priority: 'High' },
  { id: 't-2', title: 'Cetak Papan Jadwal Perkuliahan (Prop Ruang 204)', project: 'MV - NERDOS BAND', due: 'Besok', done: true, priority: 'Medium' },
  { id: 't-3', title: 'Recce Lokasi Gedung Fakultas & Koridor Lantai 2', project: 'MV - NERDOS BAND', due: '18 Okt', done: true, priority: 'High' },
  { id: 't-4', title: 'Finalisasi Breakdown Cast & Wardrobe Titik Jeda', project: 'Short Film - Titik Jeda', due: '20 Okt', done: false, priority: 'Low' }
];

// Formatting definitions for screenplay blocks
const BLOCK_TYPES = [
  {
    id: 'slugline',
    label: 'Scene Heading',
    shortLabel: 'Scene',
    hint: 'INT. / EXT. LOKASI - DAY',
    icon: Film,
    nextType: 'action'
  },
  {
    id: 'action',
    label: 'Action',
    shortLabel: 'Action',
    hint: 'Deskripsi adegan & visual...',
    icon: AlignLeft,
    nextType: 'action'
  },
  {
    id: 'character',
    label: 'Character',
    shortLabel: 'Character',
    hint: 'NAMA KARAKTER',
    icon: User,
    nextType: 'dialogue'
  },
  {
    id: 'parenthetical',
    label: 'Parenthetical',
    shortLabel: 'Paren',
    hint: '(ekspresi / intonasi)',
    icon: Parentheses,
    nextType: 'dialogue'
  },
  {
    id: 'dialogue',
    label: 'Dialogue',
    shortLabel: 'Dialogue',
    hint: 'Dialog karakter...',
    icon: MessageSquare,
    nextType: 'character'
  },
  {
    id: 'transition',
    label: 'Transition',
    shortLabel: 'Transition',
    hint: 'CUT TO:',
    icon: ArrowRightLeft,
    nextType: 'slugline'
  },
  {
    id: 'shot',
    label: 'Insert / Shot',
    shortLabel: 'Insert',
    hint: 'INSERT - OBJEK / ANGLE',
    icon: Camera,
    nextType: 'action'
  }
];

export default function App() {
  // ==========================================
  // STATE MANAGEMENT WITH LOCALSTORAGE
  // ==========================================
  const [folders, setFolders] = useState(() => {
    try {
      const saved = localStorage.getItem('mourise_folders_v1');
      return saved ? JSON.parse(saved) : INITIAL_FOLDERS;
    } catch {
      return INITIAL_FOLDERS;
    }
  });

  const [drafts, setDrafts] = useState(() => {
    try {
      const saved = localStorage.getItem('mourise_drafts_v1');
      return saved ? JSON.parse(saved) : INITIAL_DRAFTS;
    } catch {
      return INITIAL_DRAFTS;
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('mourise_tasks_v1');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Navigation State
  // Primary views: 'editor' (Write/Breakdown/Visualize/Plan/Shoot), 'home' (Landing + Recent + Folders), 'projects' (Folder explorer), 'tasks', 'settings'
  const [leftNav, setLeftNav] = useState('editor'); // Start on editor matching screenshot, with top banner/button to explore Home/Folders easily
  const [productionTab, setProductionTab] = useState('Write'); // 'Write' | 'Breakdown' | 'Visualize' | 'Plan' | 'Shoot'
  const [activeFolderId, setActiveFolderId] = useState('folder-mv-nerdos');
  const [activeDraftId, setActiveDraftId] = useState('draft-nerdos-main');

  // Editor Specific UI State
  const [focusedBlockId, setFocusedBlockId] = useState('b-9');
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [leftSidebarMode, setLeftSidebarMode] = useState('revisions'); // 'revisions' | 'scenes'
  const [dismissedUnsyncedAlert, setDismissedUnsyncedAlert] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Popups
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [showNewDraftModal, setShowNewDraftModal] = useState(false);
  const [showNewRevisionModal, setShowNewRevisionModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form inputs for modals
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderCategory, setNewFolderCategory] = useState('Music Video Production');
  const [newFolderLocation, setNewFolderLocation] = useState('');
  const [newFolderColor, setNewFolderColor] = useState('#007AFF');

  const [newDraftTitle, setNewDraftTitle] = useState('');
  const [newDraftSubtitle, setNewDraftSubtitle] = useState('');
  const [newDraftFolderId, setNewDraftFolderId] = useState('folder-mv-nerdos');

  const [newRevisionName, setNewRevisionName] = useState('');
  const [newRevisionNotes, setNewRevisionNotes] = useState('');

  // Breakdown & Shot form states
  const [selectedSceneNumber, setSelectedSceneNumber] = useState('1');
  const [newBreakdownItem, setNewBreakdownItem] = useState('');
  const [newBreakdownCategory, setNewBreakdownCategory] = useState('props');

  const [newShotSize, setNewShotSize] = useState('MS (Medium Shot)');
  const [newShotLens, setNewShotLens] = useState('35mm f/1.4');
  const [newShotMove, setNewShotMove] = useState('Handheld');
  const [newShotSubject, setNewShotSubject] = useState('');

  // Refs for block auto-focus
  const blockRefs = useRef({});

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem('mourise_folders_v1', JSON.stringify(folders));
    } catch (e) {
      console.error(e);
    }
  }, [folders]);

  useEffect(() => {
    try {
      localStorage.setItem('mourise_drafts_v1', JSON.stringify(drafts));
    } catch (e) {
      console.error(e);
    }
  }, [drafts]);

  useEffect(() => {
    try {
      localStorage.setItem('mourise_tasks_v1', JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  // Toast helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Current active draft & folder
  const activeDraft = useMemo(() => {
    return drafts.find((d) => d.id === activeDraftId) || drafts[0];
  }, [drafts, activeDraftId]);

  const activeFolder = useMemo(() => {
    return folders.find((f) => f.id === (activeDraft?.folderId || activeFolderId)) || folders[0];
  }, [folders, activeDraft, activeFolderId]);

  // Focused block object
  const focusedBlock = useMemo(() => {
    if (!activeDraft) return null;
    return activeDraft.blocks.find((b) => b.id === focusedBlockId) || activeDraft.blocks[0];
  }, [activeDraft, focusedBlockId]);

  // Extracted scenes from current draft
  const scenesList = useMemo(() => {
    if (!activeDraft) return [];
    let counter = 1;
    return activeDraft.blocks
      .filter((b) => b.type === 'slugline')
      .map((b) => {
        const num = b.sceneNumber || String(counter++);
        return {
          id: b.id,
          sceneNumber: num,
          heading: b.text || 'UNTITLED SCENE',
          intExt: b.text.toUpperCase().startsWith('EXT') ? 'EXT' : 'INT',
          timeOfDay: b.text.toUpperCase().includes('NIGHT')
            ? 'NIGHT'
            : b.text.toUpperCase().includes('MAGIC')
            ? 'MAGIC HOUR'
            : 'DAY'
        };
      });
  }, [activeDraft]);

  // Recalculate scene numbers cleanly whenever sluglines change
  const normalizeBlocksWithSceneNumbers = (blocks) => {
    let scNum = 1;
    return blocks.map((b) => {
      if (b.type === 'slugline') {
        return { ...b, sceneNumber: String(scNum++) };
      }
      return b;
    });
  };

  // ==========================================
  // SCREENPLAY EDITOR HANDLERS
  // ==========================================
  const updateActiveDraft = (updater) => {
    const nowTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== activeDraft.id) return d;
        const updated = typeof updater === 'function' ? updater(d) : { ...d, ...updater };
        return {
          ...updated,
          lastSaved: nowTime,
          lastEditedDate: `Oct 15 @ ${nowTime}`
        };
      })
    );
  };

  const handleBlockTextChange = (blockId, newText) => {
    if (activeDraft.isLocked) {
      triggerToast('Naskah sedang dikunci (Locked). Buka kunci di toolbar untuk mengedit.');
      return;
    }
    setDismissedUnsyncedAlert(false);
    updateActiveDraft((draft) => {
      const updatedBlocks = draft.blocks.map((b) => {
        if (b.id !== blockId) return b;
        return { ...b, text: newText };
      });
      return {
        ...draft,
        isSynced: false,
        blocks: normalizeBlocksWithSceneNumbers(updatedBlocks)
      };
    });
  };

  const handleChangeBlockType = (blockId, newType) => {
    if (activeDraft.isLocked) {
      triggerToast('Naskah sedang dikunci (Locked).');
      return;
    }
    const targetId = blockId || focusedBlockId;
    if (!targetId) return;

    updateActiveDraft((draft) => {
      const updatedBlocks = draft.blocks.map((b) => {
        if (b.id !== targetId) return b;
        let transformedText = b.text;
        if (['slugline', 'character', 'transition', 'shot'].includes(newType)) {
          transformedText = transformedText.toUpperCase();
        }
        if (newType === 'parenthetical' && transformedText && !transformedText.startsWith('(')) {
          transformedText = `(${transformedText.replace(/[()]/g, '')})`;
        }
        return { ...b, type: newType, text: transformedText };
      });
      return {
        ...draft,
        isSynced: false,
        blocks: normalizeBlocksWithSceneNumbers(updatedBlocks)
      };
    });

    setTimeout(() => {
      if (blockRefs.current[targetId]) {
        blockRefs.current[targetId].focus();
      }
    }, 20);
  };

  const handleInsertBlockAfter = (afterBlockId, forcedType = null) => {
    if (activeDraft.isLocked) return;
    const currentIndex = activeDraft.blocks.findIndex((b) => b.id === afterBlockId);
    const currentBlock = activeDraft.blocks[currentIndex];
    const typeMeta = BLOCK_TYPES.find((t) => t.id === currentBlock?.type) || BLOCK_TYPES[1];
    const nextType = forcedType || typeMeta.nextType || 'action';

    const newBlockId = `b-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newBlock = {
      id: newBlockId,
      type: nextType,
      text: nextType === 'parenthetical' ? '()' : ''
    };

    updateActiveDraft((draft) => {
      const copy = [...draft.blocks];
      copy.splice(currentIndex + 1, 0, newBlock);
      return {
        ...draft,
        isSynced: false,
        blocks: normalizeBlocksWithSceneNumbers(copy)
      };
    });

    setFocusedBlockId(newBlockId);
    setTimeout(() => {
      const el = blockRefs.current[newBlockId];
      if (el) {
        el.focus();
        if (nextType === 'parenthetical') {
          el.setSelectionRange(1, 1);
        }
      }
    }, 30);
  };

  const handleDeleteBlock = (blockId) => {
    if (activeDraft.isLocked) return;
    if (activeDraft.blocks.length <= 1) {
      triggerToast('Minimal harus ada 1 blok di dalam naskah.');
      return;
    }
    const idx = activeDraft.blocks.findIndex((b) => b.id === blockId);
    const prevBlock = activeDraft.blocks[idx - 1] || activeDraft.blocks[idx + 1];

    updateActiveDraft((draft) => {
      const filtered = draft.blocks.filter((b) => b.id !== blockId);
      return {
        ...draft,
        isSynced: false,
        blocks: normalizeBlocksWithSceneNumbers(filtered)
      };
    });

    if (prevBlock) {
      setFocusedBlockId(prevBlock.id);
      setTimeout(() => {
        if (blockRefs.current[prevBlock.id]) {
          blockRefs.current[prevBlock.id].focus();
        }
      }, 25);
    }
  };

  const handleMoveBlock = (blockId, direction) => {
    if (activeDraft.isLocked) return;
    const idx = activeDraft.blocks.findIndex((b) => b.id === blockId);
    if (idx === -1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= activeDraft.blocks.length) return;

    updateActiveDraft((draft) => {
      const copy = [...draft.blocks];
      const [moved] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, moved);
      return {
        ...draft,
        isSynced: false,
        blocks: normalizeBlocksWithSceneNumbers(copy)
      };
    });
  };

  const handleBlockKeyDown = (e, block) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleInsertBlockAfter(block.id);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const currIdx = BLOCK_TYPES.findIndex((t) => t.id === block.type);
      const nextIdx = e.shiftKey
        ? (currIdx - 1 + BLOCK_TYPES.length) % BLOCK_TYPES.length
        : (currIdx + 1) % BLOCK_TYPES.length;
      handleChangeBlockType(block.id, BLOCK_TYPES[nextIdx].id);
    } else if (e.key === 'Backspace' && (block.text === '' || block.text === '()')) {
      if (activeDraft.blocks.length > 1) {
        e.preventDefault();
        handleDeleteBlock(block.id);
      }
    }
  };

  const handleSyncToProject = () => {
    updateActiveDraft((draft) => ({
      ...draft,
      isSynced: true
    }));
    setDismissedUnsyncedAlert(true);
    triggerToast('Synced to Project! Semua Scene, Breakdown & Shot List telah diperbarui.');
  };

  // ==========================================
  // FOLDER & DRAFT MANAGEMENT HANDLERS
  // ==========================================
  const handleCreateFolder = (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    const folderId = `folder-${Date.now()}`;
    const newFolder = {
      id: folderId,
      name: newFolderName.trim(),
      category: newFolderCategory,
      color: newFolderColor,
      updatedAt: 'Just now',
      location: newFolderLocation.trim() || 'Indonesia',
      description: `Project Folder untuk ${newFolderName.trim()}`
    };
    setFolders((prev) => [newFolder, ...prev]);
    setActiveFolderId(folderId);
    setNewFolderName('');
    setNewFolderLocation('');
    setShowNewFolderModal(false);
    triggerToast(`Folder Project "${newFolder.name}" berhasil dibuat!`);
  };

  const handleCreateDraft = (e) => {
    e.preventDefault();
    if (!newDraftTitle.trim()) return;
    const draftId = `draft-${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
    const targetFolder = newDraftFolderId || activeFolderId || folders[0]?.id;

    const newDraftObj = {
      id: draftId,
      folderId: targetFolder,
      title: newDraftTitle.trim().toUpperCase(),
      subtitle: newDraftSubtitle.trim() || 'Screenplay Draft v1',
      author: 'Alfin Radidtya',
      lastSaved: nowTime,
      lastEditedDate: `Oct 15 @ ${nowTime}`,
      createdDate: `Oct 15 @ ${nowTime}`,
      activeVersion: 'v1',
      isSynced: false,
      isLocked: false,
      showSceneNumbers: true,
      revisions: [
        {
          id: `rev-${Date.now()}`,
          version: 'v1',
          name: newDraftTitle.trim().toUpperCase(),
          author: 'Alfin Radidtya',
          timestamp: `Oct 15 @ ${nowTime}`,
          notes: 'First draft dibuat'
        }
      ],
      blocks: [
        {
          id: `b-${Date.now()}-1`,
          type: 'slugline',
          text: 'INT. LOKASI UTAMA. DAY',
          sceneNumber: '1'
        },
        {
          id: `b-${Date.now()}-2`,
          type: 'action',
          text: 'Tuliskan deskripsi suasana adegan pembuka di sini...'
        }
      ],
      breakdown: {},
      shots: []
    };

    setDrafts((prev) => [newDraftObj, ...prev]);
    setActiveDraftId(draftId);
    setActiveFolderId(targetFolder);
    setNewDraftTitle('');
    setNewDraftSubtitle('');
    setShowNewDraftModal(false);
    setLeftNav('editor');
    setProductionTab('Write');
    triggerToast(`Draft "${newDraftObj.title}" siap ditulis!`);
  };

  const handleDuplicateDraft = (draft) => {
    const copyId = `draft-${Date.now()}`;
    const copyDraft = {
      ...JSON.parse(JSON.stringify(draft)),
      id: copyId,
      title: `${draft.title} (COPY)`,
      lastSaved: 'Just now',
      lastEditedDate: 'Oct 15 @ Just now',
      isSynced: false
    };
    setDrafts((prev) => [copyDraft, ...prev]);
    triggerToast(`Draft "${draft.title}" berhasil diduplikasi.`);
  };

  const handleDeleteDraft = (draftId) => {
    if (drafts.length <= 1) {
      triggerToast('Tidak bisa menghapus satu-satunya draft yang tersisa.');
      return;
    }
    setDrafts((prev) => {
      const remaining = prev.filter((d) => d.id !== draftId);
      if (activeDraftId === draftId && remaining[0]) {
        setActiveDraftId(remaining[0].id);
      }
      return remaining;
    });
    triggerToast('Draft telah dihapus.');
  };

  const handleCreateRevision = (e) => {
    e.preventDefault();
    const nextVerNum = (activeDraft.revisions?.length || 1) + 1;
    const versionLabel = `v${nextVerNum}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }).toLowerCase();
    const revObj = {
      id: `rev-${Date.now()}`,
      version: versionLabel,
      name: newRevisionName.trim() || `${activeDraft.title} (${versionLabel})`,
      author: 'Alfin Radidtya',
      timestamp: `Oct 15 @ ${nowTime}`,
      notes: newRevisionNotes.trim() || 'Snapshot revisi naskah'
    };

    updateActiveDraft((draft) => ({
      ...draft,
      activeVersion: versionLabel,
      revisions: [revObj, ...(draft.revisions || [])]
    }));

    setNewRevisionName('');
    setNewRevisionNotes('');
    setShowNewRevisionModal(false);
    triggerToast(`Revisi baru (${versionLabel}) berhasil disimpan!`);
  };

  const openDraftInEditor = (draft) => {
    setActiveDraftId(draft.id);
    setActiveFolderId(draft.folderId);
    setLeftNav('editor');
    setProductionTab('Write');
    if (draft.blocks?.[0]) {
      setFocusedBlockId(draft.blocks[0].id);
    }
  };

  // Breakdown & Shot Handlers
  const handleAddBreakdownTag = (e) => {
    e.preventDefault();
    if (!newBreakdownItem.trim()) return;
    const sc = selectedSceneNumber || '1';

    updateActiveDraft((draft) => {
      const currentSceneBd = draft.breakdown?.[sc] || {
        cast: [],
        extras: [],
        props: [],
        setDressing: [],
        wardrobe: []
      };
      const updatedList = [...(currentSceneBd[newBreakdownCategory] || []), newBreakdownItem.trim()];
      return {
        ...draft,
        breakdown: {
          ...(draft.breakdown || {}),
          [sc]: {
            ...currentSceneBd,
            [newBreakdownCategory]: updatedList
          }
        }
      };
    });
    setNewBreakdownItem('');
    triggerToast(`Tag ditambahkan ke Scene ${sc}!`);
  };

  const handleAddShot = (e) => {
    e.preventDefault();
    if (!newShotSubject.trim()) return;
    const sc = selectedSceneNumber || '1';
    const existingForScene = (activeDraft.shots || []).filter((s) => s.scene === sc);
    const nextLetter = String.fromCharCode(65 + existingForScene.length);

    const shotObj = {
      id: `shot-${Date.now()}`,
      scene: sc,
      shotNumber: `${sc}${nextLetter}`,
      size: newShotSize,
      lens: newShotLens,
      movement: newShotMove,
      subject: newShotSubject.trim(),
      aspect: '16:9'
    };

    updateActiveDraft((draft) => ({
      ...draft,
      shots: [...(draft.shots || []), shotObj]
    }));
    setNewShotSubject('');
    triggerToast(`Shot ${shotObj.shotNumber} berhasil ditambahkan!`);
  };

  const handleResetDemoData = () => {
    localStorage.removeItem('mourise_folders_v1');
    localStorage.removeItem('mourise_drafts_v1');
    localStorage.removeItem('mourise_tasks_v1');
    setFolders(INITIAL_FOLDERS);
    setDrafts(INITIAL_DRAFTS);
    setTasks(INITIAL_TASKS);
    setActiveFolderId('folder-mv-nerdos');
    setActiveDraftId('draft-nerdos-main');
    triggerToast('Data Demo berhasil di-reset ke kondisi awal!');
  };

  // Generate plain Fountain text for export
  const generateFountainText = () => {
    if (!activeDraft) return '';
    let output = `Title: ${activeDraft.title}\nCredit: Written by\nAuthor: ${activeDraft.author}\nDraft date: ${activeDraft.lastEditedDate}\n\n`;
    activeDraft.blocks.forEach((b) => {
      if (b.type === 'slugline') {
        output += `\n${b.sceneNumber ? `${b.sceneNumber}. ` : ''}${b.text.toUpperCase()}\n\n`;
      } else if (b.type === 'action') {
        output += `${b.text}\n\n`;
      } else if (b.type === 'shot') {
        output += `${b.text.toUpperCase()}\n\n`;
      } else if (b.type === 'character') {
        output += `                    ${b.text.toUpperCase()}\n`;
      } else if (b.type === 'parenthetical') {
        output += `               ${b.text}\n`;
      } else if (b.type === 'dialogue') {
        output += `          ${b.text}\n\n`;
      } else if (b.type === 'transition') {
        output += `                                                  ${b.text.toUpperCase()}\n\n`;
      }
    });
    return output;
  };

  const downloadFountainFile = () => {
    const content = generateFountainText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeDraft.title.replace(/\s+/g, '_')}.fountain`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast('File .fountain berhasil diunduh!');
  };

  // Auto-resize textarea height
  const adjustTextareaHeight = (el) => {
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    Object.values(blockRefs.current).forEach((el) => adjustTextareaHeight(el));
  }, [activeDraft?.blocks, leftNav, productionTab]);

  // ==========================================
  // RENDER HELPERS
  // ==========================================
  const currentRevisionObj = useMemo(() => {
    if (!activeDraft?.revisions?.length) {
      return {
        version: 'v1',
        name: activeDraft?.title || 'MV - NERDOS BAND',
        author: 'Alfin Radidtya',
        timestamp: 'May 21 @ 5:20pm'
      };
    }
    return (
      activeDraft.revisions.find((r) => r.version === activeDraft.activeVersion) ||
      activeDraft.revisions[0]
    );
  }, [activeDraft]);

  return (
    <div
      className="min-h-screen w-full flex flex-col select-none text-slate-900 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 12% 10%, rgba(216, 232, 255, 0.7) 0%, rgba(244, 246, 251, 0.9) 42%, #F3F5F9 100%)',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Inter", sans-serif'
      }}
    >
      {/* Custom Styles for Courier Screenplay & Apple Liquid Glass */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap');

        .apple-glass {
          background: rgba(255, 255, 255, 0.76);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
          border: 1px solid rgba(255, 255, 255, 0.92);
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.9);
        }

        .apple-glass-subtle {
          background: rgba(255, 255, 255, 0.62);
          backdrop-filter: blur(20px) saturate(170%);
          -webkit-backdrop-filter: blur(20px) saturate(170%);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 4px 16px -4px rgba(15, 23, 42, 0.04);
        }

        .apple-glass-pill {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(226, 232, 240, 0.85);
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        .screenplay-font {
          font-family: 'Courier Prime', 'Courier New', Courier, monospace;
          font-size: 15px;
          line-height: 1.48;
          color: #111827;
        }

        .screenplay-sheet {
          background: #FFFFFF;
          box-shadow: 0 20px 50px -12px rgba(15, 23, 42, 0.09), 0 0 1px 1px rgba(15, 23, 42, 0.04);
        }

        /* Clean custom scrollbars */
        ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.35);
          border-radius: 9999px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.55);
        }
      `}</style>

      {/* Floating Toast Notification (Liquid Glass Pill) */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-2.5 rounded-full apple-glass shadow-xl border border-white/90 text-slate-800 text-xs font-medium animate-bounce">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MAIN LAYOUT SHELL */}
      <div className="flex flex-1 h-screen overflow-hidden">
        {/* ============================================================
            1. LEFTMOST VERTICAL LIQUID APPLE RAIL (Matching Screenshot)
           ============================================================ */}
        {!zenMode && (
          <aside className="w-[68px] h-full flex flex-col items-center justify-between py-3 px-2 apple-glass border-r border-slate-200/70 z-30 shrink-0">
            {/* Top Brand & Navigation Icons */}
            <div className="flex flex-col items-center gap-4 w-full">
              {/* Studio Logo Button (Pink/Rose Liquid Gradient like screenshot top-left) */}
              <button
                onClick={() => setLeftNav('home')}
                title="Mourise Studio Home & Folders"
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #FF2D55 0%, #E11D48 100%)',
                  boxShadow: '0 8px 18px -4px rgba(225, 29, 72, 0.45), inset 0 1px 1px rgba(255,255,255,0.4)'
                }}
              >
                <Clapperboard className="w-5 h-5" />
              </button>

              {/* Nav Items: Home, Projects, Tasks, Settings */}
              <nav className="flex flex-col items-center gap-2 w-full mt-1">
                <button
                  onClick={() => setLeftNav('home')}
                  className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                    leftNav === 'home'
                      ? 'bg-blue-500/12 text-blue-600 font-semibold shadow-inner border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  <Home className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">Home</span>
                </button>

                <button
                  onClick={() => setLeftNav('projects')}
                  className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                    leftNav === 'projects'
                      ? 'bg-blue-500/12 text-blue-600 font-semibold shadow-inner border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">Projects</span>
                </button>

                <button
                  onClick={() => setLeftNav('editor')}
                  className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                    leftNav === 'editor'
                      ? 'bg-blue-500/12 text-blue-600 font-semibold shadow-inner border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">Script</span>
                </button>

                <button
                  onClick={() => setLeftNav('tasks')}
                  className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all relative ${
                    leftNav === 'tasks'
                      ? 'bg-blue-500/12 text-blue-600 font-semibold shadow-inner border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  <CheckSquare className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">Tasks</span>
                  {tasks.filter((t) => !t.done).length > 0 && (
                    <span className="absolute top-1.5 right-2.5 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </button>

                <button
                  onClick={() => setLeftNav('settings')}
                  className={`w-full py-2.5 px-1 rounded-2xl flex flex-col items-center gap-1 transition-all ${
                    leftNav === 'settings'
                      ? 'bg-blue-500/12 text-blue-600 font-semibold shadow-inner border border-blue-500/20'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-white/60'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-[10px] tracking-tight">Settings</span>
                </button>
              </nav>
            </div>

            {/* Bottom Branding Footnote */}
            <div className="flex flex-col items-center text-center gap-1 pb-1">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-slate-200 to-white border border-slate-300/70 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-sm">
                MS
              </div>
              <span className="text-[8px] text-slate-400 leading-tight">
                Mourise
                <br />
                Liquid OS
              </span>
            </div>
          </aside>
        )}

        {/* ============================================================
            2. MAIN STUDIO CONTENT AREA
           ============================================================ */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* ==========================================================
              TOP BAR 1: GLOBAL PRODUCTION HEADER (Matching Screenshot)
             ========================================================== */}
          <header className="h-[52px] px-4 apple-glass border-b border-slate-200/70 flex items-center justify-between z-20 shrink-0">
            {/* Left Side: Version Selector + Mourise Studio + Production Workflow Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
              {/* Revision Dropdown Pill (v1) */}
              <div className="relative group">
                <button
                  onClick={() => setShowNewRevisionModal(true)}
                  className="h-8 px-2.5 rounded-lg apple-glass-pill text-xs font-semibold text-blue-600 flex items-center gap-1 hover:bg-white transition-all"
                  title="Buat atau ganti revisi naskah"
                >
                  <span>{activeDraft?.activeVersion || 'v1'}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>

              {/* Studio Folder Selector (Mourise Studio) */}
              <button
                onClick={() => setLeftNav('home')}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/80 transition-all text-slate-800"
                title="Klik untuk membuka Landing Page Folder & Recent Drafts"
              >
                <div className="w-6 h-6 rounded-lg bg-slate-800 text-white flex items-center justify-center shadow-sm">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-semibold tracking-tight whitespace-nowrap">
                  Mourise Studio
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 font-medium hidden md:inline-block">
                  {activeFolder?.name}
                </span>
              </button>

              <div className="h-4 w-[1px] bg-slate-200 mx-1 hidden sm:block" />

              {/* Production Phase Workflow Tabs: Write, Breakdown, Visualize, Plan, Shoot */}
              <div className="flex items-center gap-1 bg-slate-200/45 p-1 rounded-xl border border-white/80">
                {[
                  { id: 'Write', label: 'Write', icon: PenTool },
                  { id: 'Breakdown', label: 'Breakdown', icon: Tag },
                  { id: 'Visualize', label: 'Visualize', icon: Eye },
                  { id: 'Plan', label: 'Plan', icon: Calendar },
                  { id: 'Shoot', label: 'Shoot', icon: Camera }
                ].map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = leftNav === 'editor' && productionTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setLeftNav('editor');
                        setProductionTab(tab.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                      }`}
                    >
                      <IconComponent
                        className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
                      />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Folder Dashboard Quick Button, Play, Share, AR Avatar, Mourise Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Quick Landing Page / Folder Switcher Button */}
              <button
                onClick={() => setLeftNav(leftNav === 'home' ? 'editor' : 'home')}
                className={`hidden lg:flex items-center gap-1.5 h-8 px-3 rounded-xl text-xs font-medium transition-all border ${
                  leftNav === 'home' || leftNav === 'projects'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'apple-glass-pill text-slate-700 hover:bg-white'
                }`}
              >
                <FolderKanban className="w-3.5 h-3.5" />
                <span>{leftNav === 'home' ? 'Kembali ke Editor' : 'Folders & Recent'}</span>
              </button>

              {/* Preview / Read-Through Mode */}
              <button
                onClick={() => setZenMode(!zenMode)}
                title={zenMode ? 'Keluar dari Mode Fokus' : 'Mode Fokus / Presentasi Layar Penuh'}
                className="w-8 h-8 rounded-full apple-glass-pill flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>

              {/* Share / Export */}
              <button
                onClick={() => setShowExportModal(true)}
                title="Bagikan atau Ekspor Naskah (PDF / Fountain)"
                className="w-8 h-8 rounded-full apple-glass-pill flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>

              {/* Active Collaborator Badge (AR - Alfin Radidtya matching screenshot) */}
              <div
                title="Alfin Radidtya (Writer / Director - Online)"
                className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm ring-2 ring-white cursor-pointer"
              >
                AR
              </div>

              {/* Workspace Pill (Mourise) */}
              <button
                onClick={() => setLeftNav('projects')}
                className="h-8 px-2.5 rounded-xl apple-glass-pill flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:bg-white transition-all"
              >
                <span className="w-4 h-4 rounded bg-indigo-600 text-white text-[9px] flex items-center justify-center font-bold">
                  M
                </span>
                <span className="hidden sm:inline">Mourise</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Secondary Avatar with Online Indicator */}
              <div className="relative hidden sm:flex">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-400 to-pink-500 text-white text-xs font-bold flex items-center justify-center shadow-sm border border-white">
                  AR
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white absolute -bottom-0.5 -right-0.5" />
              </div>
            </div>
          </header>

          {/* ==========================================================
              VIEW ROUTER:
              - 'home' / 'projects': Apple Liquid Landing Page (Folders, Drafts per Project, Recent Edited)
              - 'tasks': Production Checklist
              - 'settings': Studio & Apple Liquid UI Settings
              - 'editor': Full StudioBinder-style Screenplay Editor + Breakdown + Visualize + Plan + Shoot
             ========================================================== */}

          {leftNav === 'home' || leftNav === 'projects' ? (
            /* ==========================================================
               LANDING PAGE: PROJECT FOLDERS, DRAFTS PER PROJECT & RECENT EDITED
               ========================================================== */
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-8">
              {/* Top Hero Glass Banner */}
              <div className="apple-glass rounded-3xl p-6 lg:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
                <div
                  className="absolute -right-16 -top-16 w-72 h-72 rounded-full pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(255,255,255,0) 70%)'
                  }}
                />
                <div className="space-y-2 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 text-xs font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Mourise Studio • Liquid Apple Workspace</span>
                  </div>
                  <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900">
                    Selamat Datang, Alfin Radidtya
                  </h1>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Kelola seluruh naskah berdasarkan <strong>Folder Project</strong>, pantau setiap{' '}
                    <strong>Draft & Revisi</strong>, atau lanjutkan mengedit skenario terakhir Anda
                    dengan format standar industri film.
                  </p>
                </div>

                {/* Primary Quick Actions */}
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <button
                    onClick={() => setShowNewFolderModal(true)}
                    className="h-10 px-4 rounded-2xl apple-glass-pill hover:bg-white text-slate-800 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow"
                  >
                    <FolderPlus className="w-4 h-4 text-blue-600" />
                    <span>+ Folder Project Baru</span>
                  </button>

                  <button
                    onClick={() => {
                      setNewDraftFolderId(activeFolderId);
                      setShowNewDraftModal(true);
                    }}
                    className="h-10 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-semibold flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Buat Draft Script Baru</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari judul script, project folder, atau dialog..."
                    className="w-full h-10 pl-10 pr-4 rounded-2xl apple-glass text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="px-3 py-1.5 rounded-xl apple-glass-subtle font-medium">
                    Total Project: <strong className="text-slate-800">{folders.length}</strong>
                  </span>
                  <span className="px-3 py-1.5 rounded-xl apple-glass-subtle font-medium">
                    Total Draft: <strong className="text-slate-800">{drafts.length}</strong>
                  </span>
                </div>
              </div>

              {/* ========================================================
                  SECTION 1: RECENTLY EDITED SCRIPTS (RECENT YANG DI EDIT)
                 ======================================================== */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Recent Edited Scripts
                      </h2>
                      <p className="text-xs text-slate-500">
                        Naskah yang baru saja Anda sunting — klik untuk langsung melanjutkan penulisan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {drafts
                    .filter((d) =>
                      searchQuery
                        ? d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
                        : true
                    )
                    .slice(0, 4)
                    .map((draft) => {
                      const folder = folders.find((f) => f.id === draft.folderId);
                      const sceneCount = draft.blocks.filter((b) => b.type === 'slugline').length;
                      const isCurrent = draft.id === activeDraftId;

                      return (
                        <div
                          key={draft.id}
                          onClick={() => openDraftInEditor(draft)}
                          className={`group cursor-pointer rounded-3xl p-5 apple-glass transition-all duration-200 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between border ${
                            isCurrent
                              ? 'ring-2 ring-blue-500/50 border-blue-400/60'
                              : 'border-white/90'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Top Meta Row */}
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                                style={{
                                  backgroundColor: `${folder?.color || '#007AFF'}18`,
                                  color: folder?.color || '#007AFF'
                                }}
                              >
                                <Folder className="w-3 h-3 fill-current" />
                                <span className="truncate max-w-[130px]">
                                  {folder?.name || 'Project'}
                                </span>
                              </span>

                              <div className="flex items-center gap-1.5">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                                  {draft.activeVersion}
                                </span>
                                {!draft.isSynced ? (
                                  <span
                                    title="Unsynced Changes"
                                    className="w-2 h-2 rounded-full bg-amber-500"
                                  />
                                ) : (
                                  <span
                                    title="Synced to Project"
                                    className="w-2 h-2 rounded-full bg-emerald-500"
                                  />
                                )}
                              </div>
                            </div>

                            {/* Script Title & Preview */}
                            <div>
                              <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                                <span className="truncate">{draft.title}</span>
                                {draft.isLocked && <Lock className="w-3 h-3 text-slate-400 shrink-0" />}
                              </h3>
                              <p className="text-xs text-slate-500 truncate mt-0.5">
                                {draft.subtitle}
                              </p>
                            </div>

                            {/* Mini Snippet of First Slugline */}
                            <div className="p-2.5 rounded-xl bg-slate-50/90 border border-slate-200/60 screenplay-font text-[11px] text-slate-700 truncate">
                              {draft.blocks[0]?.text || 'INT. SCENE 1 - DAY'}
                            </div>
                          </div>

                          {/* Footer Info */}
                          <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {draft.lastEditedDate}
                            </span>
                            <span className="font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                              {sceneCount} Scene →
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>

              {/* ========================================================
                  SECTION 2: FOLDERING PER PROJECT & DRAFTS PER PROJECT
                 ======================================================== */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN (5 Cols): PROJECT FOLDERS */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600">
                        <FolderKanban className="w-4 h-4" />
                      </div>
                      <div>
                        <h2 className="text-base font-bold text-slate-900">
                          Project Folders
                        </h2>
                        <p className="text-xs text-slate-500">
                          Pilih folder project untuk melihat seluruh draft di dalamnya
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setShowNewFolderModal(true)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 px-2.5 py-1.5 rounded-xl hover:bg-white/70 transition-all"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Folder Baru</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {folders.map((folder) => {
                      const folderDrafts = drafts.filter((d) => d.folderId === folder.id);
                      const isSelected = folder.id === activeFolderId;

                      return (
                        <div
                          key={folder.id}
                          onClick={() => setActiveFolderId(folder.id)}
                          className={`cursor-pointer rounded-3xl p-4 transition-all duration-200 apple-glass border ${
                            isSelected
                              ? 'ring-2 ring-blue-500 border-blue-400/80 bg-white/90 shadow-lg'
                              : 'border-white/80 hover:bg-white/80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                              {/* macOS Liquid Folder Icon */}
                              <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0"
                                style={{
                                  background: `linear-gradient(135deg, ${folder.color} 0%, ${folder.color}CC 100%)`
                                }}
                              >
                                <Folder className="w-5 h-5 fill-current" />
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="text-sm font-bold text-slate-900">
                                    {folder.name}
                                  </h3>
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                                    {folderDrafts.length} Draft
                                  </span>
                                </div>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {folder.description}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {folder.location}
                                  </span>
                                  <span>•</span>
                                  <span>Update {folder.updatedAt}</span>
                                </div>
                              </div>
                            </div>

                            <ChevronRight
                              className={`w-4 h-4 mt-1 transition-transform ${
                                isSelected ? 'text-blue-600 translate-x-0.5' : 'text-slate-400'
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT COLUMN (7 Cols): DRAFTS INSIDE SELECTED PROJECT FOLDER */}
                <div className="lg:col-span-7 apple-glass rounded-3xl p-6 space-y-5 border border-white/90">
                  {(() => {
                    const selectedFolder =
                      folders.find((f) => f.id === activeFolderId) || folders[0];
                    const folderDrafts = drafts.filter((d) => d.folderId === selectedFolder?.id);

                    return (
                      <>
                        {/* Folder Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/70">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                              style={{
                                background: `linear-gradient(135deg, ${
                                  selectedFolder?.color || '#007AFF'
                                } 0%, ${selectedFolder?.color || '#007AFF'}CC 100%)`
                              }}
                            >
                              <Folder className="w-6 h-6 fill-current" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                                  {selectedFolder?.category}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900">
                                {selectedFolder?.name} — Daftar Draft Naskah
                              </h3>
                              <p className="text-xs text-slate-500">
                                Setiap project memiliki kumpulan draft & histori revisi tersendiri
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setNewDraftFolderId(selectedFolder.id);
                              setShowNewDraftModal(true);
                            }}
                            className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>+ Draft Baru di Folder Ini</span>
                          </button>
                        </div>

                        {/* Drafts List Inside Folder */}
                        {folderDrafts.length === 0 ? (
                          <div className="py-12 text-center space-y-3">
                            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                            <div className="text-sm font-semibold text-slate-700">
                              Belum ada draft naskah di folder ini
                            </div>
                            <p className="text-xs text-slate-500 max-w-sm mx-auto">
                              Klik tombol &ldquo;+ Draft Baru di Folder Ini&rdquo; untuk mulai menulis skenario pertama.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {folderDrafts.map((draft) => {
                              const scCount = draft.blocks.filter(
                                (b) => b.type === 'slugline'
                              ).length;
                              const pageEst = Math.max(1, Math.ceil(draft.blocks.length / 14));

                              return (
                                <div
                                  key={draft.id}
                                  className="p-4 rounded-2xl bg-white/80 hover:bg-white border border-slate-200/70 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >
                                  <div
                                    onClick={() => openDraftInEditor(draft)}
                                    className="cursor-pointer space-y-1.5 flex-1"
                                  >
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 text-[11px] font-bold">
                                        {draft.activeVersion}
                                      </span>
                                      <h4 className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                                        {draft.title}
                                      </h4>
                                      {!draft.isSynced ? (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 font-medium border border-amber-500/20">
                                          Unsynced Changes
                                        </span>
                                      ) : (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 font-medium border border-emerald-500/20">
                                          Synced
                                        </span>
                                      )}
                                      {draft.isLocked && (
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium flex items-center gap-1">
                                          <Lock className="w-2.5 h-2.5" /> Locked
                                        </span>
                                      )}
                                    </div>

                                    <p className="text-xs text-slate-500">{draft.subtitle}</p>

                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                                      <span>Penulis: {draft.author}</span>
                                      <span>•</span>
                                      <span>Diedit: {draft.lastEditedDate}</span>
                                      <span>•</span>
                                      <span>
                                        {scCount} Scene (~{pageEst} hlm)
                                      </span>
                                      <span>•</span>
                                      <span>{draft.revisions?.length || 1} Revisi</span>
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex items-center gap-2 shrink-0">
                                    <button
                                      onClick={() => openDraftInEditor(draft)}
                                      className="h-9 px-3.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                                    >
                                      <PenTool className="w-3.5 h-3.5" />
                                      <span>Buka Script</span>
                                    </button>

                                    <button
                                      onClick={() => handleDuplicateDraft(draft)}
                                      title="Duplikasi Draft"
                                      className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
                                    >
                                      <Copy className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      onClick={() => handleDeleteDraft(draft.id)}
                                      title="Hapus Draft"
                                      className="w-9 h-9 rounded-xl apple-glass-pill flex items-center justify-center text-slate-600 hover:text-rose-600 hover:bg-white transition-all"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </section>
            </div>
          ) : leftNav === 'tasks' ? (
            /* ==========================================================
               VIEW: PRODUCTION TASKS CHECKLIST
               ========================================================== */
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-5xl mx-auto w-full space-y-6">
              <div className="apple-glass rounded-3xl p-6 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Production Tasks & Pre-Production Checklist
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Daftar tugas departemen penulisan naskah, art prop, dan persiapan syuting Mourise Studio
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTask = {
                      id: `t-${Date.now()}`,
                      title: `Revisi Breakdown & Shotlist ${activeDraft.title}`,
                      project: activeFolder.name,
                      due: 'Minggu Ini',
                      done: false,
                      priority: 'Medium'
                    };
                    setTasks((prev) => [newTask, ...prev]);
                    triggerToast('Tugas produksi baru ditambahkan!');
                  }}
                  className="h-9 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Tambah Tugas</span>
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() =>
                      setTasks((prev) =>
                        prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t))
                      )
                    }
                    className="apple-glass rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-white/90 transition-all"
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                          task.done
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {task.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-semibold ${
                            task.done ? 'line-through text-slate-400' : 'text-slate-800'
                          }`}
                        >
                          {task.title}
                        </p>
                        <span className="text-[11px] text-slate-500">{task.project}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                        Target: {task.due}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : leftNav === 'settings' ? (
            /* ==========================================================
               VIEW: STUDIO SETTINGS
               ========================================================== */
            <div className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-4xl mx-auto w-full space-y-6">
              <div className="apple-glass rounded-3xl p-6 space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">
                    Mourise Studio — Pengaturan Workspace
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">
                    Kustomisasi tampilan White Liquid Apple UI, format halaman skenario, dan penyimpanan lokal
                  </p>
                </div>

                <div className="space-y-4 pt-2 border-t border-slate-200/70">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Tema Visual Antarmuka
                      </h3>
                      <p className="text-xs text-slate-500">
                        Apple Liquid Glass (macOS Sequoia Translucent White)
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-semibold">
                      Aktif (Default)
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200/60">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Standar Font Skenario
                      </h3>
                      <p className="text-xs text-slate-500">
                        12pt Courier Prime / Courier New (Standar Industri 1 Halaman = 1 Menit)
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold">
                      Courier Prime
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2 border-t border-slate-200/60">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        Reset Data Demo ke Awal
                      </h3>
                      <p className="text-xs text-slate-500">
                        Kembalikan naskah &ldquo;MV - NERDOS BAND&rdquo; dan seluruh folder seperti semula
                      </p>
                    </div>
                    <button
                      onClick={handleResetDemoData}
                      className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold border border-rose-200 transition-all"
                    >
                      Reset Demo Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ==========================================================
               VIEW: STUDIO SCRIPT EDITOR & PRODUCTION SUITE
               (Exact Layout & Feature Match to User's Screenshot)
               ========================================================== */
            <>
              {/* ========================================================
                  TOP BAR 2: SCRIPT ELEMENT FORMATTING & SYNC TOOLBAR
                  (Matching Screenshot Second Row)
                 ======================================================== */}
              <div className="h-[50px] px-4 apple-glass-subtle border-b border-slate-200/80 flex items-center justify-between gap-2 z-10 shrink-0">
                {/* Left Side: Sidebar Toggle, Script Title, Save Indicator */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                    title="Tampilkan / Sembunyikan Panel Revisi & Scene"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      leftSidebarOpen
                        ? 'bg-blue-500/15 text-blue-600 border border-blue-500/25'
                        : 'apple-glass-pill text-slate-600 hover:bg-white'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>

                  {/* Editable Script Title (MV - NERDOS BAND) */}
                  <div className="flex items-center gap-2 min-w-0">
                    <input
                      type="text"
                      value={activeDraft?.title || ''}
                      onChange={(e) =>
                        updateActiveDraft({ title: e.target.value.toUpperCase(), isSynced: false })
                      }
                      className="text-xs sm:text-sm font-bold text-blue-600 bg-transparent hover:bg-white/70 focus:bg-white px-2 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 tracking-tight truncate max-w-[180px] sm:max-w-[240px]"
                    />

                    {/* Save Icon + Last Saved Timestamp (Matching Screenshot) */}
                    <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-400 shrink-0">
                      <Save className="w-3.5 h-3.5 text-slate-500" />
                      <span>Last Saved @ {activeDraft?.lastSaved || '2:57pm'}</span>
                    </div>
                  </div>
                </div>

                {/* Center-Right: Screenplay Formatting Element Icons (Scene, Action, Character, Parenthetical, Dialogue, Transition, Shot) */}
                {productionTab === 'Write' && (
                  <div className="flex items-center gap-1 bg-white/70 p-1 rounded-2xl border border-slate-200/80 shadow-inner overflow-x-auto no-scrollbar">
                    {BLOCK_TYPES.map((bType) => {
                      const IconComp = bType.icon;
                      const isCurrentType = focusedBlock?.type === bType.id;
                      return (
                        <button
                          key={bType.id}
                          onClick={() => handleChangeBlockType(focusedBlock?.id, bType.id)}
                          title={`${bType.label} — Shortcut: Tekan Tab untuk mengganti format`}
                          className={`h-7 px-2.5 rounded-xl flex items-center gap-1.5 text-[11px] font-medium transition-all shrink-0 ${
                            isCurrentType
                              ? 'bg-blue-600 text-white shadow-sm font-semibold'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">{bType.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Right Side Controls: Scene Numbers, Lock Script, Sync to Project Button, Export */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Toggle Scene Numbers */}
                  <button
                    onClick={() =>
                      updateActiveDraft((d) => ({ ...d, showSceneNumbers: !d.showSceneNumbers }))
                    }
                    title="Tampilkan / Sembunyikan Nomor Scene"
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      activeDraft?.showSceneNumbers
                        ? 'apple-glass-pill text-blue-600'
                        : 'text-slate-400 hover:bg-white/60'
                    }`}
                  >
                    <Hash className="w-3.5 h-3.5" />
                  </button>

                  {/* Lock / Unlock Script */}
                  <button
                    onClick={() => {
                      updateActiveDraft((d) => ({ ...d, isLocked: !d.isLocked }));
                      triggerToast(
                        !activeDraft.isLocked
                          ? 'Naskah dikunci (Read-Only Mode).'
                          : 'Kunci naskah dibuka (Editable).'
                      );
                    }}
                    title={activeDraft?.isLocked ? 'Buka Kunci Naskah' : 'Kunci Naskah'}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                      activeDraft?.isLocked
                        ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                        : 'apple-glass-pill text-slate-600 hover:bg-white'
                    }`}
                  >
                    {activeDraft?.isLocked ? (
                      <Lock className="w-3.5 h-3.5" />
                    ) : (
                      <Unlock className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* SYNC TO PROJECT BUTTON (Matching Screenshot Blue Pill) */}
                  <button
                    onClick={handleSyncToProject}
                    className={`h-8 px-3.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                      activeDraft?.isSynced
                        ? 'bg-emerald-500/15 text-emerald-700 border border-emerald-500/30 hover:bg-emerald-500/20'
                        : 'bg-[#4F6EF7] hover:bg-[#3B5BDB] text-white shadow-blue-500/20'
                    }`}
                  >
                    <RefreshCw
                      className={`w-3.5 h-3.5 ${!activeDraft?.isSynced ? 'animate-spin' : ''}`}
                      style={{ animationDuration: '6s' }}
                    />
                    <span>{activeDraft?.isSynced ? 'Synced' : 'Sync to Project'}</span>
                  </button>

                  {/* Print / Export Modal Trigger */}
                  <button
                    onClick={() => setShowExportModal(true)}
                    title="Cetak atau Download Naskah"
                    className="w-8 h-8 rounded-xl apple-glass-pill flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-white transition-all"
                  >
                    <Printer className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* ========================================================
                  WORKSPACE BODY: LEFT REVISIONS SIDEBAR + MAIN CANVAS
                 ======================================================== */}
              <div className="flex-1 flex overflow-hidden relative">
                {/* LEFT SIDEBAR: SCREENPLAY REVISIONS & SCENE NAVIGATOR (Matching Screenshot) */}
                {leftSidebarOpen && !zenMode && (
                  <aside className="w-[250px] sm:w-[268px] h-full apple-glass border-r border-slate-200/80 flex flex-col justify-between shrink-0 z-10">
                    <div className="flex flex-col h-full overflow-hidden">
                      {/* Sidebar Mode Switcher: Revisions vs Scenes vs Drafts */}
                      <div className="p-3 border-b border-slate-200/70 space-y-2.5">
                        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-slate-200/50 border border-white">
                          <button
                            onClick={() => setLeftSidebarMode('revisions')}
                            className={`py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              leftSidebarMode === 'revisions'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Revisions ({activeDraft?.revisions?.length || 1})
                          </button>
                          <button
                            onClick={() => setLeftSidebarMode('scenes')}
                            className={`py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              leftSidebarMode === 'scenes'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Scenes ({scenesList.length})
                          </button>
                          <button
                            onClick={() => setLeftSidebarMode('drafts')}
                            className={`py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              leftSidebarMode === 'drafts'
                                ? 'bg-white text-slate-900 shadow-sm'
                                : 'text-slate-500 hover:text-slate-800'
                            }`}
                          >
                            Drafts
                          </button>
                        </div>

                        <div className="flex items-center justify-between px-1">
                          <span className="text-[11px] font-bold text-slate-700">
                            {leftSidebarMode === 'revisions'
                              ? `Screenplay Revisions (${activeDraft?.revisions?.length || 1})`
                              : leftSidebarMode === 'scenes'
                              ? `Scene Navigator (${scenesList.length})`
                              : `Project Drafts`}
                          </span>
                          {leftSidebarMode === 'revisions' && (
                            <button
                              onClick={() => setShowNewRevisionModal(true)}
                              className="text-[11px] font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
                            >
                              <Plus className="w-3 h-3" /> New
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Sidebar Content List */}
                      <div className="flex-1 overflow-y-auto divide-y divide-slate-200/50">
                        {leftSidebarMode === 'revisions' &&
                          (activeDraft?.revisions || []).map((rev) => {
                            const isCurrentVer = rev.version === activeDraft?.activeVersion;
                            return (
                              <div
                                key={rev.id}
                                onClick={() =>
                                  updateActiveDraft({ activeVersion: rev.version })
                                }
                                className={`p-3.5 cursor-pointer transition-all flex items-center justify-between relative ${
                                  isCurrentVer
                                    ? 'bg-white/95 font-semibold text-slate-900'
                                    : 'hover:bg-white/60 text-slate-600'
                                }`}
                              >
                                {isCurrentVer && (
                                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600 rounded-l" />
                                )}
                                <div className="space-y-1 pr-2 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded border border-slate-200 bg-slate-50 text-slate-700">
                                      {rev.version}
                                    </span>
                                    <span className="text-xs font-bold tracking-tight text-slate-800 truncate">
                                      {rev.name}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-400 truncate">
                                    {rev.author} • {rev.timestamp}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                        {leftSidebarMode === 'scenes' &&
                          scenesList.map((sc) => (
                            <div
                              key={sc.id}
                              onClick={() => {
                                setFocusedBlockId(sc.id);
                                const el = blockRefs.current[sc.id];
                                if (el) {
                                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                  el.focus();
                                }
                              }}
                              className="p-3 cursor-pointer hover:bg-white/80 transition-all flex items-start gap-2.5"
                            >
                              <span className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                                {sc.sceneNumber}
                              </span>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-bold text-slate-800 truncate">
                                  {sc.heading}
                                </p>
                                <div className="flex items-center gap-1.5 mt-1">
                                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-blue-500/10 text-blue-600">
                                    {sc.intExt}
                                  </span>
                                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-700">
                                    {sc.timeOfDay}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}

                        {leftSidebarMode === 'drafts' &&
                          drafts
                            .filter((d) => d.folderId === activeFolder?.id)
                            .map((d) => (
                              <div
                                key={d.id}
                                onClick={() => openDraftInEditor(d)}
                                className={`p-3 cursor-pointer transition-all ${
                                  d.id === activeDraftId
                                    ? 'bg-white font-semibold border-r-2 border-blue-600'
                                    : 'hover:bg-white/60'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-slate-800 truncate">
                                    {d.title}
                                  </span>
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                                    {d.activeVersion}
                                  </span>
                                </div>
                                <p className="text-[10px] text-slate-400 mt-0.5 truncate">
                                  Diedit {d.lastEditedDate}
                                </p>
                              </div>
                            ))}
                      </div>
                    </div>

                    {/* Sidebar Footer: Quick Folder Switcher */}
                    <div className="p-3 border-t border-slate-200/70 bg-white/50">
                      <button
                        onClick={() => setLeftNav('home')}
                        className="w-full py-2 px-3 rounded-xl apple-glass-pill hover:bg-white text-xs font-semibold text-slate-700 flex items-center justify-between transition-all"
                      >
                        <span className="flex items-center gap-2 truncate">
                          <Folder className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span className="truncate">{activeFolder?.name}</span>
                        </span>
                        <span className="text-[10px] text-blue-600">Semua Folder →</span>
                      </button>
                    </div>
                  </aside>
                )}

                {/* ======================================================
                    MAIN CENTER WORKSPACE (WRITE / BREAKDOWN / VISUALIZE / PLAN / SHOOT)
                   ====================================================== */}
                <main className="flex-1 h-full overflow-y-auto px-4 sm:px-8 py-6">
                  {productionTab === 'Write' && (
                    <div className="max-w-[820px] mx-auto space-y-4 pb-28">
                      {/* 1. UNSYNCED CHANGES ALERT BANNER (Exact Match to Screenshot) */}
                      {!activeDraft?.isSynced && !dismissedUnsyncedAlert && (
                        <div className="rounded-xl bg-[#FFFDF5]/95 backdrop-blur-md border border-[#F3E3B2] px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
                          <div className="flex items-center gap-2.5 text-xs text-[#92600A]">
                            <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0" />
                            <span>
                              <strong className="font-semibold">Unsynced Changes:</strong> This
                              revision was generated on {activeDraft?.lastEditedDate}, but has not
                              been synced to the project yet.
                            </span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={handleSyncToProject}
                              className="text-[11px] font-bold text-amber-800 hover:underline px-2 py-0.5 rounded bg-amber-500/15"
                            >
                              Sync Now
                            </button>
                            <button
                              onClick={() => setDismissedUnsyncedAlert(true)}
                              className="text-slate-400 hover:text-slate-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* 2. REVISION GENERATED METADATA CARD (Exact Match to Screenshot) */}
                      <div className="rounded-xl apple-glass px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border border-white/90">
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                          <span className="px-2 py-0.5 rounded border border-slate-200 bg-white text-[11px] font-bold text-slate-700 shadow-2xs">
                            {currentRevisionObj.version}
                          </span>
                          <span>
                            <strong className="font-semibold text-slate-800">
                              {currentRevisionObj.name}
                            </strong>{' '}
                            was generated by{' '}
                            <strong className="font-semibold text-slate-800">
                              {currentRevisionObj.author}
                            </strong>{' '}
                            on {currentRevisionObj.timestamp}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span>Tekan</span>
                          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                            Tab
                          </kbd>
                          <span>ganti elemen</span>
                          <span>•</span>
                          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-semibold text-slate-600">
                            Enter
                          </kbd>
                          <span>baris baru</span>
                        </div>
                      </div>

                      {/* 3. SCREENPLAY PAGE SHEET (US LETTER / A4 PAPER CANVAS) */}
                      <div className="screenplay-sheet rounded-2xl px-6 sm:px-14 md:px-20 py-12 sm:py-16 min-h-[1040px] relative transition-all">
                        {/* Subtle Page Number Top Right */}
                        <div className="screenplay-font text-xs text-slate-400 text-right mb-6 select-none">
                          1.
                        </div>

                        {/* Screenplay Blocks List */}
                        <div className="space-y-3">
                          {activeDraft?.blocks.map((block) => {
                            const isFocused = focusedBlockId === block.id;

                            // Industry-standard screenplay block layout rules
                            let wrapperClass = 'relative group transition-all rounded-lg ';
                            let inputClass =
                              'w-full bg-transparent resize-none overflow-hidden focus:outline-none screenplay-font ';

                            if (block.type === 'slugline') {
                              wrapperClass += 'pt-4 pb-1';
                              inputClass += 'font-bold uppercase tracking-wide text-slate-900';
                            } else if (block.type === 'action') {
                              wrapperClass += 'py-0.5';
                              inputClass += 'text-slate-900';
                            } else if (block.type === 'shot') {
                              wrapperClass += 'pt-2 pb-0.5';
                              inputClass += 'font-bold uppercase text-slate-900';
                            } else if (block.type === 'character') {
                              wrapperClass += 'pt-3 pb-0 sm:pl-[32%] sm:pr-[20%]';
                              inputClass += 'font-bold uppercase text-center sm:text-left text-slate-900';
                            } else if (block.type === 'parenthetical') {
                              wrapperClass += 'py-0 sm:pl-[25%] sm:pr-[25%]';
                              inputClass += 'text-slate-800';
                            } else if (block.type === 'dialogue') {
                              wrapperClass += 'pb-1 sm:pl-[18%] sm:pr-[18%]';
                              inputClass += 'text-slate-900';
                            } else if (block.type === 'transition') {
                              wrapperClass += 'pt-2 pb-2';
                              inputClass += 'font-bold uppercase text-right text-slate-900';
                            }

                            return (
                              <div
                                key={block.id}
                                className={`${wrapperClass} ${
                                  isFocused ? 'bg-blue-50/55 ring-1 ring-blue-500/20 -mx-2 px-2' : ''
                                }`}
                              >
                                {/* Scene Numbers on Both Sides for Slugline (Matching Screenshot: 1 INT. GEDUNG FAKULTAS. DAY 1) */}
                                {block.type === 'slugline' && activeDraft?.showSceneNumbers && (
                                  <>
                                    <span className="screenplay-font font-bold text-slate-900 absolute -left-4 sm:-left-9 top-4 select-none">
                                      {block.sceneNumber}
                                    </span>
                                    <span className="screenplay-font font-bold text-slate-900 absolute -right-4 sm:-right-9 top-4 select-none">
                                      {block.sceneNumber}
                                    </span>
                                  </>
                                )}

                                {/* Editable Screenplay Textarea */}
                                <textarea
                                  ref={(el) => {
                                    blockRefs.current[block.id] = el;
                                  }}
                                  rows={1}
                                  value={block.text}
                                  onFocus={() => setFocusedBlockId(block.id)}
                                  onChange={(e) => {
                                    adjustTextareaHeight(e.target);
                                    handleBlockTextChange(block.id, e.target.value);
                                  }}
                                  onKeyDown={(e) => handleBlockKeyDown(e, block)}
                                  placeholder={
                                    BLOCK_TYPES.find((t) => t.id === block.type)?.hint ||
                                    'Ketik naskah...'
                                  }
                                  className={inputClass}
                                />

                                {/* Hover / Focus Floating Quick Controls on Right Margin */}
                                {isFocused && !activeDraft.isLocked && (
                                  <div className="hidden sm:flex items-center gap-1 absolute -right-12 top-1/2 -translate-y-1/2 bg-white/95 border border-slate-200/90 shadow-sm rounded-lg p-0.5 z-10">
                                    <button
                                      type="button"
                                      onClick={() => handleMoveBlock(block.id, 'up')}
                                      title="Pindah ke atas"
                                      className="p-1 text-slate-400 hover:text-slate-700"
                                    >
                                      <ArrowUp className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMoveBlock(block.id, 'down')}
                                      title="Pindah ke bawah"
                                      className="p-1 text-slate-400 hover:text-slate-700"
                                    >
                                      <ArrowDown className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteBlock(block.id)}
                                      title="Hapus baris"
                                      className="p-1 text-slate-400 hover:text-rose-600"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Bottom Quick Add Element Bar inside Page */}
                        {!activeDraft?.isLocked && (
                          <div className="mt-12 pt-6 border-t border-dashed border-slate-200 flex flex-wrap items-center justify-center gap-2">
                            <span className="text-[11px] text-slate-400 mr-1">
                              + Tambah Blok Cepat:
                            </span>
                            {BLOCK_TYPES.map((t) => (
                              <button
                                key={t.id}
                                onClick={() =>
                                  handleInsertBlockAfter(
                                    activeDraft.blocks[activeDraft.blocks.length - 1]?.id,
                                    t.id
                                  )
                                }
                                className="px-2.5 py-1 rounded-lg bg-slate-100/80 hover:bg-blue-50 text-[11px] font-medium text-slate-600 hover:text-blue-600 border border-slate-200/70 transition-all"
                              >
                                + {t.shortLabel}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ======================================================
                      TAB 2: BREAKDOWN (Cast, Props, Set Dressing, Wardrobe)
                     ====================================================== */}
                  {productionTab === 'Breakdown' && (
                    <div className="max-w-6xl mx-auto space-y-6 pb-20">
                      <div className="apple-glass rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            Script Breakdown • {activeDraft.title}
                          </span>
                          <h2 className="text-lg font-bold text-slate-900">
                            Tagging Kebutuhan Produksi Per Scene
                          </h2>
                          <p className="text-xs text-slate-500">
                            Kelompokkan Cast, Props, Set Dressing, dan Wardrobe otomatis dari setiap Scene
                          </p>
                        </div>

                        {/* Scene Selector Pill */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-slate-600">Pilih Scene:</span>
                          <select
                            value={selectedSceneNumber}
                            onChange={(e) => setSelectedSceneNumber(e.target.value)}
                            className="h-9 px-3 rounded-xl apple-glass-pill text-xs font-semibold text-slate-800 focus:outline-none"
                          >
                            {scenesList.map((s) => (
                              <option key={s.id} value={s.sceneNumber}>
                                Scene {s.sceneNumber} — {s.heading}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Add Breakdown Tag Form */}
                      <form
                        onSubmit={handleAddBreakdownTag}
                        className="apple-glass rounded-2xl p-4 flex flex-wrap items-center gap-3"
                      >
                        <select
                          value={newBreakdownCategory}
                          onChange={(e) => setNewBreakdownCategory(e.target.value)}
                          className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          <option value="cast">Cast (Pemeran Utama)</option>
                          <option value="extras">Extras (Figuran)</option>
                          <option value="props">Props (Properti)</option>
                          <option value="setDressing">Set Dressing (Dekorasi Set)</option>
                          <option value="wardrobe">Wardrobe (Kostum)</option>
                        </select>

                        <input
                          type="text"
                          value={newBreakdownItem}
                          onChange={(e) => setNewBreakdownItem(e.target.value)}
                          placeholder="Contoh: Tas Ransel, Jam Tangan, Papan Informasi..."
                          className="flex-1 min-w-[220px] h-9 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />

                        <button
                          type="submit"
                          className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Tambah ke Scene {selectedSceneNumber}</span>
                        </button>
                      </form>

                      {/* Scene Breakdown Cards Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { key: 'cast', title: 'Cast / Karakter', icon: Users, color: 'text-rose-600 bg-rose-500/10' },
                          { key: 'props', title: 'Props / Properti', icon: Package, color: 'text-blue-600 bg-blue-500/10' },
                          { key: 'setDressing', title: 'Set Dressing', icon: Layers, color: 'text-amber-600 bg-amber-500/10' },
                          { key: 'wardrobe', title: 'Wardrobe / Kostum', icon: Shirt, color: 'text-purple-600 bg-purple-500/10' },
                          { key: 'extras', title: 'Extras / Background', icon: User, color: 'text-emerald-600 bg-emerald-500/10' }
                        ].map((cat) => {
                          const IconComp = cat.icon;
                          const items =
                            activeDraft.breakdown?.[selectedSceneNumber]?.[cat.key] || [];
                          return (
                            <div
                              key={cat.key}
                              className="apple-glass rounded-3xl p-5 space-y-3 border border-white/90"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div
                                    className={`w-8 h-8 rounded-xl flex items-center justify-center ${cat.color}`}
                                  >
                                    <IconComp className="w-4 h-4" />
                                  </div>
                                  <h3 className="text-sm font-bold text-slate-800">{cat.title}</h3>
                                </div>
                                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {items.length}
                                </span>
                              </div>

                              {items.length === 0 ? (
                                <p className="text-xs text-slate-400 italic py-3">
                                  Belum ada item untuk Scene {selectedSceneNumber}
                                </p>
                              ) : (
                                <div className="flex flex-wrap gap-2 pt-1">
                                  {items.map((item, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs"
                                    >
                                      {item}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ======================================================
                      TAB 3 & 5: VISUALIZE & SHOOT (Storyboard & Camera Shot List)
                     ====================================================== */}
                  {(productionTab === 'Visualize' || productionTab === 'Shoot') && (
                    <div className="max-w-6xl mx-auto space-y-6 pb-20">
                      <div className="apple-glass rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            {productionTab === 'Visualize'
                              ? 'Visual Storyboard Cards'
                              : 'Cinematography Shot List'}{' '}
                            • {activeDraft.title}
                          </span>
                          <h2 className="text-lg font-bold text-slate-900">
                            {productionTab === 'Visualize'
                              ? 'Visualisasi Framing & Urutan Gambar'
                              : 'Daftar Shot Kamera, Lensa & Pergerakan Rig'}
                          </h2>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500">Scene Aktif:</span>
                          <select
                            value={selectedSceneNumber}
                            onChange={(e) => setSelectedSceneNumber(e.target.value)}
                            className="h-9 px-3 rounded-xl apple-glass-pill text-xs font-semibold text-slate-800"
                          >
                            {scenesList.map((s) => (
                              <option key={s.id} value={s.sceneNumber}>
                                Scene {s.sceneNumber} — {s.heading}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Quick Add Shot Form */}
                      <form
                        onSubmit={handleAddShot}
                        className="apple-glass rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-5 gap-3"
                      >
                        <select
                          value={newShotSize}
                          onChange={(e) => setNewShotSize(e.target.value)}
                          className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          <option>WS (Wide Shot)</option>
                          <option>MS (Medium Shot)</option>
                          <option>MCU (Medium Close Up)</option>
                          <option>CU (Close Up)</option>
                          <option>INSERT / ECU</option>
                        </select>

                        <select
                          value={newShotLens}
                          onChange={(e) => setNewShotLens(e.target.value)}
                          className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          <option>24mm f/1.4 Wide</option>
                          <option>35mm f/1.4 Prime</option>
                          <option>50mm f/1.2 Prime</option>
                          <option>85mm f/1.4 Portrait</option>
                        </select>

                        <select
                          value={newShotMove}
                          onChange={(e) => setNewShotMove(e.target.value)}
                          className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700"
                        >
                          <option>Static Tripod</option>
                          <option>Gimbal Tracking</option>
                          <option>Handheld Subtle</option>
                          <option>Slow Push-In</option>
                        </select>

                        <input
                          type="text"
                          value={newShotSubject}
                          onChange={(e) => setNewShotSubject(e.target.value)}
                          placeholder="Deskripsi visual shot..."
                          className="h-9 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                        />

                        <button
                          type="submit"
                          className="h-9 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Tambah Shot</span>
                        </button>
                      </form>

                      {/* Storyboard Cards / Shot Table */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {(activeDraft.shots || []).map((shot) => (
                          <div
                            key={shot.id}
                            className="apple-glass rounded-3xl overflow-hidden border border-white/90 flex flex-col justify-between"
                          >
                            {/* 16:9 Cinema Frame Visualization */}
                            <div className="aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 relative p-4 flex flex-col justify-between text-white">
                              <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                                <span className="px-2 py-0.5 rounded bg-white/15 backdrop-blur-md font-bold">
                                  SHOT {shot.shotNumber}
                                </span>
                                <span>
                                  {shot.lens} • {shot.aspect}
                                </span>
                              </div>

                              {/* Rule of Thirds Grid Overlay */}
                              <div className=" inset-4 border border-white/15 pointer-events-none flex items-center justify-center py-6">
                                <Video className="w-8 h-8 text-white/30" />
                              </div>

                              <div className="flex items-center justify-between text-[10px] font-semibold">
                                <span className="text-blue-300">{shot.size}</span>
                                <span className="text-emerald-300">{shot.movement}</span>
                              </div>
                            </div>

                            <div className="p-4 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase text-blue-600">
                                  Scene {shot.scene}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-slate-800 leading-relaxed">
                                {shot.subject}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ======================================================
                      TAB 4: PLAN (Interactive Production Stripboard)
                     ====================================================== */}
                  {productionTab === 'Plan' && (
                    <div className="max-w-5xl mx-auto space-y-5 pb-20">
                      <div className="apple-glass rounded-3xl p-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                          Shooting Schedule Stripboard • {activeDraft.title}
                        </span>
                        <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                          Urutan Stripboard Produksi Berdasarkan Lokasi & Waktu (DAY / NIGHT)
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Warna strip mengikuti standar asisten sutradara (Putih/Kuning: INT/EXT DAY, Biru/Hijau: NIGHT)
                        </p>
                      </div>

                      <div className="space-y-3">
                        {scenesList.map((sc) => {
                          const isNight = sc.timeOfDay.includes('NIGHT');
                          const stripStyle = isNight
                            ? 'bg-indigo-950 text-white border-indigo-800'
                            : 'bg-amber-50/95 text-slate-900 border-amber-300';

                          return (
                            <div
                              key={sc.id}
                              className={`rounded-2xl p-4 border-l-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${stripStyle}`}
                            >
                              <div className="flex items-center gap-4">
                                <div className="text-lg font-black font-mono px-3 py-1 rounded-xl bg-black/10">
                                  #{sc.sceneNumber}
                                </div>
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/10">
                                      {sc.intExt}
                                    </span>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/10">
                                      {sc.timeOfDay}
                                    </span>
                                  </div>
                                  <h3 className="text-sm font-bold mt-1">{sc.heading}</h3>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs opacity-85">
                                <span>Durasi Est: 4/8 Hlm</span>
                                <span>•</span>
                                <span>
                                  Cast:{' '}
                                  {(activeDraft.breakdown?.[sc.sceneNumber]?.cast || [
                                    'MAHASISWA BARU'
                                  ]).join(', ')}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </main>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ============================================================
          FLOATING QUICK ASSISTANT / SHORTCUT BUTTON (Bottom Right Matching Screenshot)
         ============================================================ */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {zenMode && (
          <button
            onClick={() => setZenMode(false)}
            className="h-11 px-4 rounded-full apple-glass text-xs font-semibold text-slate-800 shadow-lg flex items-center gap-2"
          >
            <Minimize2 className="w-4 h-4 text-blue-600" />
            <span>Keluar Zen Mode</span>
          </button>
        )}

        <button
          onClick={() => setLeftNav(leftNav === 'home' ? 'editor' : 'home')}
          title={
            leftNav === 'home'
              ? 'Kembali ke Editor Script'
              : 'Buka Project Folders & Recent Edited Scripts'
          }
          className="w-12 h-12 rounded-full text-white flex items-center justify-center shadow-xl transition-transform hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #007AFF 0%, #2563EB 100%)',
            boxShadow: '0 10px 25px -5px rgba(0, 122, 255, 0.55)'
          }}
        >
          {leftNav === 'home' ? (
            <PenTool className="w-5 h-5" />
          ) : (
            <FolderKanban className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ============================================================
          MODALS (LIQUID APPLE FROSTED DIALOGS)
         ============================================================ */}

      {/* 1. MODAL: NEW PROJECT FOLDER */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/25 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl apple-glass p-6 space-y-5 shadow-2xl border border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <FolderPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Buat Folder Project Baru</h3>
                  <p className="text-xs text-slate-500">
                    Kelompokkan draft skenario berdasarkan produksi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nama Folder Project</label>
                <input
                  type="text"
                  required
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Contoh: MV - NERDOS BAND / Short Film Baru"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Kategori</label>
                  <select
                    value={newFolderCategory}
                    onChange={(e) => setNewFolderCategory(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  >
                    <option>Music Video Production</option>
                    <option>Short Film</option>
                    <option>Feature Film</option>
                    <option>Yearbook / School</option>
                    <option>Commercial / TVC</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Lokasi Utama</label>
                  <input
                    type="text"
                    value={newFolderLocation}
                    onChange={(e) => setNewFolderLocation(e.target.value)}
                    placeholder="Contoh: Ponorogo / Surabaya"
                    className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Warna Label Folder</label>
                <div className="flex items-center gap-2.5">
                  {['#007AFF', '#5856D6', '#FF2D55', '#FF9500', '#34C759', '#0F172A'].map(
                    (clr) => (
                      <button
                        key={clr}
                        type="button"
                        onClick={() => setNewFolderColor(clr)}
                        className={`w-7 h-7 rounded-full transition-transform ${
                          newFolderColor === clr ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : ''
                        }`}
                        style={{ backgroundColor: clr }}
                      />
                    )
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Simpan Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MODAL: NEW SCRIPT DRAFT */}
      {showNewDraftModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/25 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl apple-glass p-6 space-y-5 shadow-2xl border border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Buat Draft Script Baru</h3>
                  <p className="text-xs text-slate-500">
                    Draft akan tersimpan di dalam folder project pilihan Anda
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewDraftModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateDraft} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Pilih Folder Project</label>
                <select
                  value={newDraftFolderId}
                  onChange={(e) => setNewDraftFolderId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  {folders.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} ({f.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Judul Script / Draft</label>
                <input
                  type="text"
                  required
                  value={newDraftTitle}
                  onChange={(e) => setNewDraftTitle(e.target.value)}
                  placeholder="Contoh: MV - NERDOS BAND (EPISODE 2)"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">
                  Deskripsi / Subtitle Draft
                </label>
                <input
                  type="text"
                  value={newDraftSubtitle}
                  onChange={(e) => setNewDraftSubtitle(e.target.value)}
                  placeholder="Contoh: Director's Treatment & Camera Blocking"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewDraftModal(false)}
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Mulai Menulis Script
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. MODAL: NEW SCREENPLAY REVISION */}
      {showNewRevisionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/25 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl apple-glass p-6 space-y-5 shadow-2xl border border-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Buat Revisi Naskah Baru (v{(activeDraft?.revisions?.length || 1) + 1})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Simpan snapshot versi untuk histori produksi
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNewRevisionModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRevision} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Nama Revisi</label>
                <input
                  type="text"
                  value={newRevisionName}
                  onChange={(e) => setNewRevisionName(e.target.value)}
                  placeholder={`${activeDraft?.title} - Production Polish`}
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Catatan Perubahan</label>
                <input
                  type="text"
                  value={newRevisionNotes}
                  onChange={(e) => setNewRevisionNotes(e.target.value)}
                  placeholder="Contoh: Penambahan dialog V.O. di koridor lantai dua"
                  className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewRevisionModal(false)}
                  className="h-9 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm"
                >
                  Generate Revisi Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. MODAL: EXPORT / SHARE SCRIPT */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/25 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl apple-glass p-6 space-y-5 shadow-2xl border border-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Ekspor & Cetak Naskah — {activeDraft?.title}
                </h3>
                <p className="text-xs text-slate-500">
                  Unduh sebagai file .fountain (Final Draft / StudioBinder compatible) atau cetak PDF
                </p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] max-h-60 overflow-y-auto whitespace-pre-wrap">
              {generateFountainText()}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(generateFountainText());
                  triggerToast('Teks naskah berhasil disalin ke Clipboard!');
                }}
                className="h-9 px-4 rounded-xl apple-glass-pill text-xs font-semibold text-slate-700 hover:bg-white flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Teks</span>
              </button>

              <button
                onClick={() => {
                  setShowExportModal(false);
                  window.print();
                }}
                className="h-9 px-4 rounded-xl apple-glass-pill text-xs font-semibold text-slate-700 hover:bg-white flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={downloadFountainFile}
                className="h-9 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .Fountain</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}