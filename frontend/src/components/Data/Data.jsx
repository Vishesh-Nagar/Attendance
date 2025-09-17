const BACKEND_URL = process.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const getSubjects = async () => {
    // Try fetching from backend first
    try {
        const resp = await fetch(`${BACKEND_URL}/api/subjects/`, {
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            credentials: 'include',
        });
        if (resp.ok) {
            const data = await resp.json();
            // Save a copy to localStorage as cache
            localStorage.setItem('subjects', JSON.stringify(data));
            return data;
        }
    } catch (e) {
        // network or CORS error - fall back to localStorage
        console.warn('Could not reach backend, using localStorage fallback', e);
    }

    const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
    return subjects;
};

export const saveSubjects = async (subjects) => {
    // Save locally first
    localStorage.setItem('subjects', JSON.stringify(subjects));

    // Then attempt to persist to backend
    try {
        const resp = await fetch(`${BACKEND_URL}/api/subjects/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(subjects),
        });
        if (!resp.ok) {
            console.warn('Backend responded with error while saving subjects');
        } else {
            // If backend returns subjects (created with ids), update local cache
            try {
                const body = await resp.json();
                if (body && body.subjects) {
                    localStorage.setItem('subjects', JSON.stringify(body.subjects));
                    return body.subjects;
                }
            } catch (e) {
                // ignore JSON parse errors
            }
        }
    } catch (e) {
        console.warn('Failed to save to backend, offline or CORS blocked', e);
    }
};

export const patchSubject = async (id, partial) => {
    try {
        const resp = await fetch(`${BACKEND_URL}/api/subjects/${id}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(partial),
        });
        if (!resp.ok) {
            console.warn('Failed to patch subject');
            return null;
        }
        const data = await resp.json();
        // update local cache
        const subjects = JSON.parse(localStorage.getItem('subjects') || '[]');
        const idx = subjects.findIndex(s => s.id === data.id);
        if (idx >= 0) {
            subjects[idx] = data;
            localStorage.setItem('subjects', JSON.stringify(subjects));
        }
        return data;
    } catch (e) {
        console.warn('Patch request failed', e);
        return null;
    }
};

export default { getSubjects, saveSubjects };