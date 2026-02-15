
-- Database Schema for Nexus ERP File Manager
CREATE TABLE IF NOT EXISTS erp_folders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    parent_id INT DEFAULT NULL,
    path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES erp_folders(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS erp_files (
    id INT AUTO_INCREMENT PRIMARY KEY,
    folder_id INT DEFAULT NULL,
    filename VARCHAR(255) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    content_type VARCHAR(100) NOT NULL,
    size INT NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploader_ip VARCHAR(45),
    version INT DEFAULT 1,
    is_hidden BOOLEAN DEFAULT FALSE,
    local_path TEXT NOT NULL,
    FOREIGN KEY (folder_id) REFERENCES erp_folders(id) ON DELETE CASCADE
);

-- Insert root folders as examples
INSERT INTO erp_folders (name, path, parent_id) VALUES ('Documents', '/Documents', NULL);
INSERT INTO erp_folders (name, path, parent_id) VALUES ('Images', '/Images', NULL);
