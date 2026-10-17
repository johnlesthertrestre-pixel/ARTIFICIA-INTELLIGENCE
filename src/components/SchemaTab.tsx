import React, { useState } from 'react';
import { DatabaseSchema, SchemaTable } from '../types/forge';
import {
  Database,
  Table as TableIcon,
  Key,
  Link2,
  Copy,
  Check,
  Download,
  Code2,
  FileJson,
  Layers,
  Sparkles
} from 'lucide-react';
import { downloadTextFile } from '../lib/exportUtils';

interface SchemaTabProps {
  schema: DatabaseSchema;
  appName: string;
}

export const SchemaTab: React.FC<SchemaTabProps> = ({ schema, appName }) => {
  const [selectedTable, setSelectedTable] = useState<string>(schema.tables[0]?.name || '');
  const [codeView, setCodeView] = useState<'erd' | 'sql' | 'prisma' | 'types' | 'seed'>('erd');
  const [copied, setCopied] = useState(false);

  const activeTable = schema.tables.find(t => t.name === selectedTable) || schema.tables[0];

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCurrentCode = () => {
    switch (codeView) {
      case 'sql':
        return { content: schema.sqlDdl, filename: `${appName.toLowerCase()}-schema.sql`, mime: 'text/sql' };
      case 'prisma':
        return { content: schema.prismaSchema || '// No Prisma schema generated', filename: 'schema.prisma', mime: 'text/plain' };
      case 'types':
        return { content: schema.typescriptInterfaces, filename: 'database.types.ts', mime: 'text/typescript' };
      case 'seed':
        return { content: schema.seedDataJson || '{}', filename: 'seed.json', mime: 'application/json' };
      default:
        return { content: schema.sqlDdl, filename: `${appName.toLowerCase()}-schema.sql`, mime: 'text/sql' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Schema Control Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">Database Architecture & Data Model</h2>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {schema.tables.length} Tables Normalized
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Relational integrity with foreign keys, composite indexes, and multi-format exports.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setCodeView('erd')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                codeView === 'erd' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Interactive ERD</span>
            </button>
            <button
              onClick={() => setCodeView('sql')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                codeView === 'sql' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>PostgreSQL DDL</span>
            </button>
            <button
              onClick={() => setCodeView('prisma')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                codeView === 'prisma' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Prisma ORM</span>
            </button>
            <button
              onClick={() => setCodeView('types')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                codeView === 'types' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>TypeScript Types</span>
            </button>
            <button
              onClick={() => setCodeView('seed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                codeView === 'seed' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Seed Data</span>
            </button>
          </div>

          {codeView !== 'erd' && (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleCopy(getCurrentCode().content)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={() => {
                  const c = getCurrentCode();
                  downloadTextFile(c.filename, c.content, c.mime);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ERD Visual Canvas Mode */}
      {codeView === 'erd' ? (
        <div className="space-y-6">
          {/* Relationship Overview Bar */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-xl p-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="font-semibold text-slate-400 flex items-center gap-1.5">
              <Link2 className="w-4 h-4 text-indigo-400" /> Foreign Key Relationships:
            </span>
            {schema.tables.flatMap(t =>
              t.columns
                .filter(c => c.foreignKey)
                .map((c, i) => (
                  <span
                    key={`${t.name}-${c.name}-${i}`}
                    className="font-mono bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-indigo-300 flex items-center gap-1"
                  >
                    <span>{t.name}.{c.name}</span>
                    <span className="text-slate-500">→</span>
                    <span className="text-emerald-400">{c.foreignKey}</span>
                  </span>
                ))
            )}
          </div>

          {/* Tables Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            {schema.tables.map(table => {
              const isSelected = selectedTable === table.name;
              return (
                <div
                  key={table.name}
                  onClick={() => setSelectedTable(table.name)}
                  className={`bg-slate-900/90 rounded-2xl border transition shadow-xl overflow-hidden cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 ring-1 ring-indigo-500/50'
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {/* Table Header */}
                  <div className="bg-slate-950/80 p-4 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TableIcon className="w-4 h-4 text-indigo-400" />
                      <h3 className="font-mono font-bold text-sm text-white">{table.name}</h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {table.columns.length} cols
                      </span>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Inspected
                      </span>
                    )}
                  </div>

                  {/* Table Description */}
                  <div className="px-4 py-2 bg-slate-900/40 border-b border-slate-800/60 text-xs text-slate-400">
                    {table.description}
                  </div>

                  {/* Columns List */}
                  <div className="p-4 space-y-2">
                    {table.columns.map((col, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between gap-3 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs font-mono"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {col.isPrimary ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              <Key className="w-2.5 h-2.5" /> PK
                            </span>
                          ) : col.foreignKey ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              <Link2 className="w-2.5 h-2.5" /> FK
                            </span>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-700" />
                          )}

                          <span className={`font-semibold truncate ${col.isPrimary ? 'text-amber-200' : 'text-slate-200'}`}>
                            {col.name}
                          </span>

                          {col.isUnique && (
                            <span className="text-[9px] text-cyan-400 bg-cyan-950/40 px-1 rounded border border-cyan-800/40">
                              UNIQUE
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-slate-400 text-[11px]">{col.type}</span>
                          {!col.isNullable && !col.isPrimary && (
                            <span className="text-[9px] text-slate-500">NOT NULL</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Code Viewer for SQL, Prisma, Types, Seed */
        <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>{getCurrentCode().filename}</span>
            <span>{getCurrentCode().content.split('\n').length} lines</span>
          </div>
          <pre className="p-5 text-xs text-slate-200 font-mono overflow-x-auto leading-relaxed max-h-[600px] selection:bg-indigo-600 selection:text-white">
            <code>{getCurrentCode().content}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
